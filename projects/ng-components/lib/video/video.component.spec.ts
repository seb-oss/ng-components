import { Component } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { VideoComponent, VideoSourceType } from "./video.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "test-sebng-video",
    template: `
        <sebng-video
            [allowFullScreen]="allowFullScreen"
            [autoplay]="autoplay"
            [height]="height"
            [className]="className"
            [id]="id"
            [loop]="loop"
            [showControls]="showControls"
            [showInfo]="showInfo"
            [sourceType]="sourceType"
            [width]="width"
            [src]="src"
        ></sebng-video>
    `,
})
class VideoTestComponent {
    allowFullScreen?: boolean;
    autoplay?: boolean;
    className?: string;
    height: string;
    id?: string;
    loop?: boolean;
    name: string;
    showControls?: boolean;
    showInfo?: boolean;
    sourceType: VideoSourceType;
    width: string;
    src: string;
}

describe("VideoComponent", () => {
    let component: VideoTestComponent;
    let fixture: ComponentFixture<VideoTestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule],
                declarations: [VideoComponent, VideoTestComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(VideoTestComponent);
        component = fixture.componentInstance;
        component.src = "sourcepath";
        component.width = "500";
        component.height = "250";
        component.name = "myVideo";
        component.sourceType = "local";

        fixture.detectChanges();
    });

    it("Should render", () => {
        expect(component).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myTVideoClass";
        const id: string = "myTVideoId";
        component.className = className;
        component.id = id;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`.${className}`))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(`#${id}`)).length).toBeGreaterThan(0);
    });

    it("Should render embed video when sourceType is set to `stream`", () => {
        const sourceType: VideoSourceType = "stream";
        component.sourceType = sourceType;
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css("iframe")).length).toBe(1);
    });

    it("Should enable autoplay, loop, showControls and showInfo when passed", () => {
        component.autoplay = true;
        component.loop = true;
        component.showControls = true;
        component.showInfo = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("video")).attributes.autoplay).toEqual("true");
        expect(fixture.debugElement.query(By.css("video")).attributes.loop).toEqual("true");
        expect(fixture.debugElement.query(By.css("video")).attributes.controls).toEqual("true");

        component.sourceType = "stream";
        component.autoplay = true;
        component.loop = true;
        component.showControls = true;
        component.showInfo = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("iframe")).attributes.src.indexOf("autoplay=1")).toBeGreaterThan(-1);
        expect(fixture.debugElement.query(By.css("iframe")).attributes.src.indexOf("loop=1")).toBeGreaterThan(-1);
        expect(fixture.debugElement.query(By.css("iframe")).attributes.src.indexOf("controls=1")).toBeGreaterThan(-1);
        expect(
            fixture.debugElement.query(By.css("iframe")).attributes.src.indexOf("&amp;showinfo=1&amp;title=1&amp;byline=1&amp;portrait=1")
        ).toBeGreaterThan(-1);
    });

    it("Should render local video as muted when autoplay is enabled", () => {
        component.autoplay = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("video")).attributes.muted).toEqual("true");
    });
});
