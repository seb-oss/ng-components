
import { ImageComponent } from "./image.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

describe("Component: ImageComponent", () => {
    let fixture: ComponentFixture<ImageComponent>;
    let component: ImageComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [ImageComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ImageComponent);
            component = fixture.componentInstance;
            component.src = "image-src";
            component.width = "20";
            component.height = "40";
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeDefined();
        expect(component).not.toBeNull();
    }));

    it("should be defined and have the right className", async(() => {
        component.className = "my-image";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-image"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".my-image"))).not.toBeNull();
    }));

    it("should only use image tag when told to, use div tag otherwise", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector("img")).toBeNull();
        component.useImgTag = true;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector("img")).toBeDefined();
        expect(fixture.debugElement.nativeElement.querySelector("img")).not.toBeNull();
    }));

});
