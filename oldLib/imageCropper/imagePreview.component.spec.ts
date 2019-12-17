
import { ImagePreviewComponent } from "./imagePreview.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SimpleChange } from "@angular/core";

describe("Component: ImagePreviewComponent", () => {
    let fixture: ComponentFixture<ImagePreviewComponent>;
    let component: ImagePreviewComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [ImagePreviewComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ImagePreviewComponent);
            component = fixture.componentInstance;
            component.handleUploadImage = () => true;
        });
    }));

    it("should render and be defined", async(() => {
        component.selectButtonText = "select image";
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should render and receive the correct button text", async(() => {
        component.selectButtonText = "select image";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".profile-image-container button")).nativeElement.innerHTML).toContain("select image");
    }));

    it("file upload change should fire handleUploadImage method", async(() => {
        component.selectButtonText = "select image";
        fixture.detectChanges();

        const mockHandleUploadImage = spyOn(component, "handleUploadImage");

        const fileInput = fixture.debugElement.query(By.css(".profile-image-container > #fileInput"));

        fileInput.triggerEventHandler("change", null);

        expect(mockHandleUploadImage).toHaveBeenCalled();

    }));

    it("button select click should fire onFileInputClick method", async(() => {
        component.selectButtonText = "select image";
        component.previewSrc = "xxxx";
        fixture.detectChanges();

        const mockHandleUploadImageClick = spyOn(component, "onFileInputClick").and.callThrough();

        const fileInput = fixture.debugElement.query(By.css(".profile-image-container button"));

        fileInput.triggerEventHandler("click", null);

        component.previewSrc = "";

        fixture.detectChanges();

        fileInput.triggerEventHandler("click", null);

        expect(mockHandleUploadImageClick).toHaveBeenCalledTimes(2);

    }));

    it("fileInputClick function should be called on file button click ", async(() => {
        component.selectButtonText = "select image";
        fixture.detectChanges();

        const mockHandleFileInputClick = spyOn(component, "fileInputClick").and.callThrough();

        const fileInput = fixture.debugElement.query(By.css(".profile-image-container #fileInput"));

        fileInput.triggerEventHandler("click", { target: { value: "" } });

        expect(mockHandleFileInputClick).toHaveBeenCalled();
    }));

    it("should render default svg image when previewSrc is empty", (done: DoneFn) => {
        component.selectButtonText = "Select Image";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".profile-image")).query(By.css("svg"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".profile-image")).query(By.css("img"))).toBeFalsy();
        expect(component.cropDataResult).toEqual("");

        component.previewSrc = "xxxxx";
        component.ngOnInit();

        fixture.detectChanges();

        expect(component.cropDataResult).toEqual("xxxxx");
        expect(fixture.debugElement.query(By.css(".profile-image")).query(By.css("svg"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".profile-image")).query(By.css("img"))).toBeTruthy();
        done();

    });

    it("The ngOnChanges lifeCyle should be able to set the set the cropDataResult for preview on cropResult change", (done: DoneFn) => {

        component.selectButtonText = "select image";
        component.cropResult = undefined;

        fixture.detectChanges();

        expect(component.cropDataResult).toBeFalsy();

        component.ngOnChanges({
            cropResult: new SimpleChange(undefined, "xxxxx", true)
        });

        fixture.detectChanges();

        component.ngOnChanges({
            cropResult: new SimpleChange("xxxxx", "abc", false)
        });

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.cropDataResult).toBeTruthy();
            expect(component.cropDataResult).toEqual("abc");

            done();
        });
    });
    it("fileInput field should call fileInputClick method on click", (done: DoneFn) => {
        component.selectButtonText = "select image";
        fixture.detectChanges();

        const mockFileInputClick = spyOn(component, "fileInputClick").and.callThrough();

        const file = fixture.debugElement.query(By.css("#fileInput"));

        file.triggerEventHandler("click", { target: { value: "file" } });

        expect(mockFileInputClick).toHaveBeenCalled();
        done();
    });

});
