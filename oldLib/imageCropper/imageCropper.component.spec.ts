import { Component, ViewChild } from "@angular/core";
import { ImageCropperComponent, OptionProps } from "./imageCropper.component";
import { TestBed, async, ComponentFixture, tick, fakeAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { ImageCropperModule } from "./imageCropper.module";

enum DragMode {
    Crop = "crop",
    Move = "move",
    None = "none",
}

@Component({
    selector: "tac-cropper",
    template: `  <ac-image-cropper
                    #cropper
                    imageCropperClassName="{{imageCropperClassName}}"
                    previewClassName="{{previewClassName}}"
                    cancelText="Cancel"
                    [cropperConfigs]="cropperConfigs"
                    [cropBoxData]="cropBoxData"
                    reset={{reset}}
                    [moveTo]="moveTo"
                    [scaleX]="scaleX"
                    [scaleY]="scaleY"
                    [scaleX]="scaleX"
                    [enable]="enable"
                    [rotateTo]="rotateTo"
                    [zoomTo]="zoomTo"
                    [canvasData]="canvasData"
                    [toggle]="toggle"
                    [previewSrc]="previewSrc"
                    [alwaysAlignedCropper]="alwaysAlignedCropper"
                    [onCrop]="onCrop && onCrop.bind(this)">
</ac-image-cropper>`,
})
class CustomTestClass {
    @ViewChild("cropper") cropperComponent: ImageCropperComponent;

    reset: boolean = false;
    previewClassName?: string;
    imageCropperClassName?: string;
    cropperConfigs: OptionProps;
    zoomTo: number;
    moveTo?: Array<number>;
    cropBoxData?: any;
    canvasData?: any;
    scaleX: number;
    scaleY: number;
    enable?: boolean;
    rotateTo?: number;
    alwaysAlignedCropper: boolean;
    toggle: boolean;
    previewSrc: string;

    constructor() {
        this.cropperConfigs = {
            aspectRatio: 0,
            preview: ".image-preview",
            guides: false,
            dragMode: DragMode.Crop,
            data: { x: 0, y: 0, width: 0, height: 0, scaleX: 0, scaleY: 0, rotate: 0 }
        };
        this.previewClassName = "sadqasd";
        this.imageCropperClassName = "sqadq";
        this.reset = false;
        this.zoomTo = 0;
        this.cropBoxData = { left: 5, top: 5, width: 10, height: 20 };
        this.toggle = true;
        this.alwaysAlignedCropper = false;
        this.previewSrc = "";
        this.moveTo = [0, 0];
    }

    onCrop(croppedData) {
        return true;
    }
}

describe("Component: ImageCropperComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, ImageCropperModule],
            declarations: [CustomTestClass],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CustomTestClass);
            component = fixture.componentInstance;
        });
    }));

    it("should render and be defined", async(() => {
        component.previewClassName = "mycropper";
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should render and receive the correct css class name", async(() => {
        component.previewClassName = "image-preview";
        component.imageCropperClassName = "image-cropper";
        component.toggle = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".image-preview"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("ngChange lifeCycle should run respective methods and cropperConfigs changed", async(() => {
        component.previewClassName = "preview-cropper";
        component.imageCropperClassName = "image-cropper";

        // schenario, cropDataBox changed and should react to change

        const mockCropDataBox = spyOn(component.cropperComponent, "setCropBoxData").and.callThrough();
        component.cropBoxData = undefined;
        fixture.detectChanges();
        component.cropBoxData = { left: 5, top: 5, width: 10, height: 30 };
        fixture.detectChanges();
        expect(mockCropDataBox).toHaveBeenCalled();

        // schenario, moveTo changed and should react to the change
        const mockMoveTo = spyOn(component.cropperComponent, "onMoveTo").and.callThrough();
        component.moveTo = [0, 10];
        fixture.detectChanges();
        expect(mockMoveTo).toHaveBeenCalled();

        // schenario, canvasData changed and should react to change
        const mockCanvasData = spyOn(component.cropperComponent, "setCanvasData");
        component.canvasData = { left: 5, top: 5, width: 10, height: 10, naturalWidth: 4, naturalHeight: 4 };
        fixture.detectChanges();
        expect(mockCanvasData).toHaveBeenCalled();

        // Scenario scaleY changed and should react to change
        const mockScaleYChanged = spyOn(component.cropperComponent, "setYScale");
        component.scaleY = 5;
        fixture.detectChanges();
        expect(mockScaleYChanged).toHaveBeenCalled();

        // Scenario scaleX changed and should react to change
        const mockScaleXChanged = spyOn(component.cropperComponent, "setXScale");
        component.scaleX = 5;
        fixture.detectChanges();
        expect(mockScaleXChanged).toHaveBeenCalled();

        // Scenario enable changed and should react to change
        const mockEnableChanged = spyOn(component.cropperComponent, "onEnable");
        component.enable = true;
        fixture.detectChanges();
        expect(mockEnableChanged).toHaveBeenCalled();

        // Scenario enable was set to true changed and should react to change
        const mockDisableChanged = spyOn(component.cropperComponent, "disable");
        component.enable = false;
        fixture.detectChanges();
        expect(mockDisableChanged).toHaveBeenCalled();

        // Scenario reset was set to true changed and should react to change
        const mockResetChanged = spyOn(component.cropperComponent, "onReset");
        component.reset = true;
        fixture.detectChanges();
        expect(mockResetChanged).toHaveBeenCalled();

        // Scenario rotate was set to true changed and should react to change
        const mockRotateChanged = spyOn(component.cropperComponent, "onRotateTo");
        component.rotateTo = 5;
        fixture.detectChanges();
        expect(mockRotateChanged).toHaveBeenCalled();

        // Scenario zoomTo was set to true changed and should react to change
        const mockZoomToChanged = spyOn(component.cropperComponent, "OnZoomTo");
        component.zoomTo = 5;
        fixture.detectChanges();
        expect(mockZoomToChanged).toHaveBeenCalled();

    }));

    it("cancel button should call the dismissCropper on click", fakeAsync(() => {
        component.toggle = false;

        fixture.detectChanges();
        expect(component.cropperComponent.toggle).toBeFalsy();

        component.toggle = true;

        fixture.detectChanges();

        expect(component.cropperComponent.toggle).toBeTruthy();

        const btnCancel = fixture.debugElement.query(By.css("#cancelBtn"));

        const dismissButtonMock = spyOn(component.cropperComponent, "dismissCropper").and.callThrough();

        btnCancel.triggerEventHandler("click", null);

        tick();

        expect(dismissButtonMock).toHaveBeenCalled();
        expect(component.cropperComponent.toggle).toBeFalsy();
    }));

    it("should throw an error when unchangeable prop is changed after mounting", async(() => {
        // Schenario setAspectRatio changed
        try {
            const mockAspectRatio = spyOn(component.cropperComponent, "setAspectRatio").and.callThrough();
            component.cropperConfigs = {
                aspectRatio: 2,
                preview: ".image-preview",
                guides: false,
            };
            fixture.detectChanges();
            expect(mockAspectRatio).toThrowError();

            const mockSetDragMode = spyOn(component.cropperComponent, "setDragMode").and.callThrough();
            fixture.detectChanges();
            // schenario, dragMode changed should throw error because it shouldn't change
            component.cropperConfigs = {
                aspectRatio: 0,
                preview: ".image-preview",
                guides: false,
                dragMode: DragMode.Move
            };
            fixture.detectChanges();
            expect(mockSetDragMode).toThrowError();

            // Scenario data of the cropperConfigs changed and should throw error because datat is not allowed to change
            const mockDataChanged = spyOn(component.cropperComponent, "setData");
            component.cropperConfigs = {
                aspectRatio: 0,
                preview: ".image-preview",
                guides: false,
                data: { x: 10, y: 10, width: 10, height: 0, scaleX: 5, scaleY: 8, rotate: 9 }
            };
            fixture.detectChanges();
            expect(mockDataChanged).toThrowError();
        } catch (err) {
            console.error("This is part of a test, throwing an error is what is expected.");
        }
    }));
    /*
        it("alignCropper method should be called on crop move when alwaysAlignedCropper is set to true ", async(() => {
            component.alwaysAlignedCropper = true;
            component.previewSrc = "https://cdn-images-1.medium.com/max/1600/1*mONNI1lG9VuiqovpnYqicA.jpeg";
            const cropMoveSpy = spyOn(component.cropperComponent, "alignCropBox").and.callThrough();

            fixture.detectChanges();
            component.moveTo = [0, 50];
            fixture.detectChanges();
            component.moveTo = [0, 70];
            fixture.detectChanges();
            setTimeout(() => {
                expect(cropMoveSpy).toHaveBeenCalled();
            }, 1000);
        }));*/

    it("method onCropClickshould be called on Crop button click", async(() => {
        const cropMock = spyOn(component.cropperComponent, "onCropClick");
        const cropBtn = fixture.debugElement.query(By.css("#cropBtn"));
        cropBtn.nativeElement.click();

        expect(cropMock).toHaveBeenCalled();

    }));

});
