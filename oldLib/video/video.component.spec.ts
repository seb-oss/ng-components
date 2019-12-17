import { VideoComponent } from "./video.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

describe("Component: VideoComponent", () => {
    let component: VideoComponent;
    let fixture: ComponentFixture<VideoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [VideoComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(VideoComponent);
            component = fixture.componentInstance;
            component.src = "assets/videos/sample.mp4";
            component.name = "my-video";
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(component).toBeDefined();
        expect(component).not.toBeNull();
    }));

    it("should have the expected css class name", async(() => {
        component.className = "video-component";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".video-component"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".video-component"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeNull();
    }));

    it("should render a local source type video", async(() => {
        component.sourceType = "local";
        fixture.detectChanges();
        // stream source uses iframe
        expect(fixture.debugElement.query(By.css("iframe"))).toBeNull();
        expect(fixture.debugElement.query(By.css("video > source")).nativeElement.src).not.toContain("html5");
    }));

    it("should  render and support stream type video src", async(() => {
        component.sourceType = "stream";
        component.src = "https://www.youtube.com/watch?v=f19fctL72CY";

        fixture.detectChanges();
        // stream type src should have iframe and not use htm5
        expect(fixture.debugElement.query(By.css("iframe"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css("video"))).toBeNull();
        expect(fixture.debugElement.query(By.css("iframe")).nativeElement.src).toContain("html5");
    }));

    it("function initDimentions should be able to set video height and width", async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            // test for width
            component.width = "50px";
            component.videoStyle = undefined;

            fixture.detectChanges();

            component.initDimentions();

            expect(component.videoStyle.width).toEqual("50px");

            // test for height
            component.height = "20px";
            component.videoStyle = undefined;

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.initDimentions();

                expect(component.videoStyle.height).toEqual("20px");
                expect(Object.keys(component.videoStyle).length).toEqual(2);
            });

        });
    }));

});
