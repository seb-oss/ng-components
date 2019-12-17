import { Component, Input, ViewChild, ViewEncapsulation, ElementRef, OnInit, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import Cropper from "cropperjs/dist/cropper.esm.js";

export interface OptionProps {
    aspectRatio?: number;
    autoCrop?: boolean;
    autoCropArea?: number;
    background?: boolean;
    center?: boolean;
    checkCrossOrigin?: boolean;
    checkOrientation?: boolean;
    cropBoxMovable?: boolean;
    cropBoxResizable?: boolean;
    data?: Cropper.Data;
    dragMode?: Cropper.DragMode;
    guides?: boolean;
    highlight?: boolean;
    initialAspectRatio?: number;
    minCanvasHeight?: number;
    minCanvasWidth?: number;
    minContainerHeight?: number;
    minContainerWidth?: number;
    minCropBoxHeight?: number;
    minCropBoxWidth?: number;
    modal?: boolean;
    movable?: boolean;
    preview?: Element | Element[] | NodeList | string;
    responsive?: boolean;
    restore?: boolean;
    rotatable?: boolean;
    scalable?: boolean;
    toggleDragModeOnDblclick?: boolean;
    viewMode?: Cropper.ViewMode;
    wheelZoomRatio?: number;
    zoomOnTouch?: boolean;
    zoomOnWheel?: boolean;
    zoomable?: boolean;
    ready?(event: CustomEvent): void;
    zoom?(event: CustomEvent): void;
    crop?(event: CustomEvent): void;
    cropend?(event: CustomEvent): void;
    cropmove?(event: CustomEvent): void;
    cropstart?(event: CustomEvent): void;
}

export interface CanvasData {
    left: number;
    top: number;
    width: number;
    height: number;
    naturalWidth: number;
    naturalHeight: number;
}

export interface CropBoxData {
    left: number;
    top: number;
    width: number;
    height: number;
}

const unchangeableProps = [
    "dragMode",
    "aspectRatio",
    "data",
    "crop"
];

const optionProps = [
    "aspectRatio",
    "autoCrop",
    "autoCropArea",
    "background",
    "center",
    "checkCrossOrigin",
    "checkOrientation",
    "cropBoxMovable",
    "cropBoxResizable",
    "data",
    "dragMode",
    "guides",
    "highlight",
    "initialAspectRatio",
    "minCanvasHeight",
    "minCanvasWidth",
    "minContainerHeight",
    "minContainerWidth",
    "minCropBoxHeight",
    "minCropBoxWidth",
    "modal",
    "movable",
    "preview",
    "responsive",
    "restore",
    "rotatable",
    "scalable",
    "toggleDragModeOnDblclick",
    "viewMode",
    "wheelZoomRatio",
    "zoomOnTouch",
    "zoomOnWheel",
    "zoomable",
    "ready",
    "zoom",
    "crop",
    "cropend",
    "cropmove",
    "cropstart",
];

@Component({
    selector: "ac-image-cropper",
    templateUrl: "./imageCropper.component.html",
    styleUrls: ["./imageCropper.component.scss", "../../node_modules/cropperjs/dist/cropper.css"],
    encapsulation: ViewEncapsulation.None
})
export class ImageCropperComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @ViewChild("image") image: ElementRef;

    isLoading: boolean;
    alignCropper: boolean;
    cropper: Cropper;
    cropResult: string;
    isImageLoaded: boolean;
    src: string | ArrayBuffer;

    // cropper component's own properties
    @Input() toggle?: boolean;
    @Input() cropperConfigs?: OptionProps;
    @Input() className?: string;
    @Input() onCrop: (imageData: string) => void;
    @Input() onToggleChange: (toggle: boolean) => void;
    @Input() onCustomButtonClick?: (e: Event) => void;
    @Input() cropButtonText?: string;
    @Input() customButtonText?: string;
    @Input() cancelText?: string;
    @Input() selectButtonText?: string;
    @Input() previewClassName?: string;
    @Input() imageCropperClassName?: string;

    @Input() previewSrc?: string;
    @Input() alt?: string;
    @Input() crossOrigin?: string;
    @Input() enable?: boolean;
    @Input() rotateTo?: number;
    @Input() scaleX?: number;
    @Input() scaleY?: number;
    @Input() zoomTo?: number;
    @Input() moveTo?: Array<number>;
    @Input() reset?: boolean;
    @Input() cropBoxData?: CropBoxData;
    @Input() canvasData?: CanvasData;
    @Input() alwaysAlignedCropper?: boolean;
    @Input() showCustomButton?: boolean;

    ngAfterViewInit() {
        const options: OptionProps = Object.keys(this.cropperConfigs || {})
            .filter((propKey) => optionProps.indexOf(propKey) !== -1)
            .reduce((prevOptions, propKey: keyof OptionProps) =>
                ({ ...prevOptions, [propKey]: this.cropperConfigs[propKey] })
                , {});
        const OptionalEvents = {
            cropend: this.alignCropBox.bind(this),
            cropmove: this.alignCropBox.bind(this)
        };
        const updatedOptions = this.alignCropper ? { ...options, ...OptionalEvents } : options;

        if (this.image) {
            this.cropper = new Cropper(this.image.nativeElement, updatedOptions);

            this.setXScale(this.scaleX);
            this.setYScale(this.scaleY);

            if (this.enable) {
                this.onEnable();
            } else {
                this.disable();
            }

            this.onRotateTo(this.rotateTo);
            if (this.moveTo.length === 1) {
                this.onMoveTo(this.moveTo[0], this.moveTo[1]);
            } else {
                this.onMoveTo(this.moveTo[0]);
            }

            if (this.previewSrc) {
                this.onRegenerateCropper(this.previewSrc, null);
            }
        }

    }

    ngOnInit() {
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onCropClick = this.onCropClick.bind(this);
        this.dismissCropper = this.dismissCropper.bind(this);

        this.toggle = false;
        this.scaleX = this.scaleX ? this.scaleX : 1;
        this.scaleY = this.scaleY ? this.scaleY : 1;
        this.enable = this.enable ? this.enable : true;
        this.zoomTo = this.zoomTo ? this.zoomTo : 1;
        this.rotateTo = this.rotateTo ? this.rotateTo : 0;
        this.moveTo = this.moveTo ? this.moveTo : [0, 0];
        this.alt = this.alt === undefined ? "picture" : this.alt;
        this.crossOrigin = this.crossOrigin ? this.crossOrigin : null;
        this.alignCropper = this.alwaysAlignedCropper !== undefined ? this.alwaysAlignedCropper : true;
        this.isImageLoaded = false;
        this.src = this.previewSrc;
    }

    ngOnChanges(changes: SimpleChanges) {
        if ((changes.previewSrc && !changes.previewSrc.isFirstChange()) && changes.previewSrc.currentValue !== changes.previewSrc.previousValue) {
            this.cropResult = changes.previewSrc.currentValue;
            this.cropper.reset().clear().replace(changes.previewSrc.currentValue);
        }
        if ((changes.alwaysAlignedCropper && !changes.alwaysAlignedCropper.isFirstChange()) && changes.alwaysAlignedCropper.currentValue !== changes.alwaysAlignedCropper.previousValue) {
            this.alignCropper = this.alwaysAlignedCropper;

            if (this.alignCropper) {
                this.setCropBoxData(this.cropBoxData);
            }
        }
        if ((changes.cropperConfigs && !changes.cropperConfigs.isFirstChange()) && changes.cropperConfigs.currentValue.aspectRatio !== changes.cropperConfigs.previousValue.aspectRatio) {
            this.setAspectRatio(changes.cropperConfigs.currentValue.aspectRatio);
        }
        if ((changes.cropperConfigs && !changes.cropperConfigs.isFirstChange()) && changes.cropperConfigs.currentValue.data !== changes.cropperConfigs.previousValue.data) {
            this.setData(changes.cropperConfigs.currentValue.data);
        }
        if ((changes.cropperConfigs && !changes.cropperConfigs.isFirstChange()) && changes.cropperConfigs.currentValue.dragMode !== changes.cropperConfigs.previousValue.dragMode) {
            this.setDragMode(changes.cropperConfigs.currentValue.dragMode);
        }
        if ((changes.canvasData && !changes.canvasData.isFirstChange()) && changes.canvasData.currentValue !== changes.canvasData.previousValue) {
            this.setCanvasData(changes.canvasData.currentValue);
        }
        if ((changes.cropBoxData && !changes.cropBoxData.isFirstChange()) && changes.cropBoxData.currentValue !== changes.cropBoxData.previousValue) {
            this.setCropBoxData(changes.cropBoxData.currentValue);
        }
        if ((changes.moveTo && !changes.moveTo.isFirstChange()) && changes.moveTo.currentValue !== changes.moveTo.previousValue) {
            if (changes.moveTo.currentValue.length > 1) {
                this.onMoveTo(changes.moveTo.currentValue[0], changes.moveTo.currentValue[1]);
            } else {
                this.onMoveTo(changes.moveTo.currentValue[0]);
            }
        }
        if ((changes.zoomTo && !changes.zoomTo.isFirstChange()) && changes.zoomTo.currentValue !== changes.zoomTo.previousValue) {
            this.OnZoomTo(changes.zoomTo.currentValue);
        }
        if ((changes.rotateTo && !changes.rotateTo.isFirstChange()) && changes.rotateTo.currentValue !== changes.rotateTo.previousValue) {
            this.onRotateTo(changes.rotateTo.currentValue);
        }
        if ((changes.scaleX && !changes.scaleX.isFirstChange()) && changes.scaleX.currentValue !== changes.scaleX.previousValue) {
            this.setXScale(changes.scaleX.currentValue);
        }
        if ((changes.scaleY && !changes.scaleY.isFirstChange()) && changes.scaleY.currentValue !== changes.scaleY.previousValue) {
            this.setYScale(changes.scaleY.currentValue);
        }
        if ((changes.enable && !changes.enable.isFirstChange()) && changes.enable.currentValue !== changes.enable.previousValue) {
            if (changes.enable.currentValue) {
                this.onEnable();
            } else {
                this.disable();
            }
        }

        if ((changes.reset && !changes.reset.isFirstChange()) && changes.reset.currentValue !== false) {
            if (changes.reset.currentValue) {
                this.onReset();
            }
        }
        if ((changes.toggle && !changes.toggle.isFirstChange()) && changes.toggle.currentValue === false) {
            this.dismissCropper();
        }
        if (changes.cropperConfigs !== this.cropperConfigs && (changes.cropperConfigs && !changes.cropperConfigs.isFirstChange())) {
            Object.keys(changes.cropperConfigs.currentValue).forEach((propKey: keyof OptionProps) => {
                let isDifferentVal = changes.cropperConfigs.previousValue[propKey] !== changes.cropperConfigs.currentValue[propKey];
                const isUnchangeableProps = unchangeableProps.indexOf(propKey) !== -1;

                if (typeof changes.cropperConfigs.currentValue[propKey] === "function" && typeof changes.cropperConfigs.previousValue[propKey] === "function") {
                    isDifferentVal = changes.cropperConfigs.previousValue[propKey].toString() !== changes.cropperConfigs.currentValue[propKey].toString();
                }

                if (isDifferentVal && isUnchangeableProps) {
                    throw new Error(`config: ${propKey} can't be change after rendering`);
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.image) {
            delete this.image;
        }
        // Destroy the cropper, this makes sure events such as resize are cleaned up and do not leak
        if (this.cropper) {
            this.cropper.destroy();
            delete this.cropper;
        }
    }

    /**
     *
     * @param e : cropperDrag event,
     * calculate and control the cropper so that it doesn't espace the cropper box
     */
    alignCropBox(e: any) {
        if (e.target && e.target.cropper) {
            const cropper: any = e.target.cropper;
            const cropBoxData: any = cropper.getCropBoxData();
            const canvasData: any & { naturalWidth: number; naturalHeight: number; } = { ...cropper.getCanvasData() };
            if (cropBoxData.left < canvasData.left) {
                const newCropBoxData = { ...this.cropBoxData, left: canvasData.left + 1 };
                this.cropBoxData = newCropBoxData;

                this.setCropBoxData(this.cropBoxData);
            } else if ((cropBoxData.left + cropBoxData.width) > (canvasData.left + canvasData.width)) {
                const newCropBoxData = { ...this.cropBoxData, left: (canvasData.left + canvasData.width - cropBoxData.width - 1) };
                this.cropBoxData = newCropBoxData;

                this.setCropBoxData(this.cropBoxData);
            }

            if ((cropBoxData.top + cropBoxData.height) > (canvasData.top + canvasData.height)) {
                const offset = (cropBoxData.top + cropBoxData.height) - (canvasData.top + canvasData.height);
                const newCropBoxData = { ...this.cropBoxData, top: (cropBoxData.top - offset), left: cropBoxData.left };
                this.cropBoxData = newCropBoxData;

                this.setCropBoxData(this.cropBoxData);
            } else if (canvasData.top > cropBoxData.top) {
                const newCropBoxData = { ...this.cropBoxData, top: (canvasData.top), left: cropBoxData.left };
                this.cropBoxData = newCropBoxData;

                this.setCropBoxData(this.cropBoxData);
            }
        }
    }

    onLoad() {
        this.isImageLoaded = true;
    }

    setCropDataResult(result: string, callBack: () => void) {
        this.src = result;
        this.toggle = true;
        if (this.onToggleChange) {
            this.onToggleChange(true);
        }
        this.isLoading = true;
        return callBack();
    }

    onRegenerateCropper(image: string, callBack: () => void) {
        this.cropper.reset().clear().replace(image);
        if (callBack) {
            callBack();
        }
    }

    handleUploadImage(e: any, cropResult?: string) {
        e.preventDefault();
        if (cropResult) {
            this.src = cropResult;
            this.toggle = true;
            if (this.onToggleChange) {
                this.onToggleChange(true);
            }
        } else {
            let files;
            if (e.dataTransfer) {
                files = e.dataTransfer.files;
            } else if (e.target) {
                files = e.target.files;
            }

            const file = files[0];
            // file type is only image.
            if (/^image\//.test(file.type)) {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result as string;
                    this.setCropDataResult(result, () => {
                        setTimeout(() => {
                            this.onRegenerateCropper(result, () => {
                                this.isLoading = false;
                            });
                        }, 100);
                    });
                };
                reader.readAsDataURL(file);
            } else {
                throw new Error("You could only upload images.");
            }
        }

    }

    stopProp(e: Event) {
        e.stopPropagation();
    }

    dismissCropper() {
        this.toggle = false;
        if (this.onToggleChange) {
            this.onToggleChange(false);
        }
    }

    setDragMode(mode: Cropper.DragMode): Cropper {
        return this.cropper.setDragMode(mode);
    }

    setAspectRatio(aspectRatio: number): Cropper {
        return this.cropper.setAspectRatio(aspectRatio);
    }

    getCroppedCanvas(options: Cropper.GetCroppedCanvasOptions): HTMLCanvasElement {
        return this.cropper.getCroppedCanvas(options);
    }

    setCropBoxData(data: Cropper.SetCropBoxDataOptions): Cropper {
        return this.cropper.setCropBoxData(data);
    }

    getCropBoxData(): Cropper.CropBoxData {
        return this.cropper.getCropBoxData();
    }

    setCanvasData(data: Cropper.SetCanvasDataOptions): Cropper {
        return this.cropper.setCanvasData(data);
    }

    getCanvasData(): Cropper.CanvasData {
        return this.cropper.getCanvasData();
    }

    getImageData(): Cropper.ImageData {
        return this.cropper.getImageData();
    }

    getContainerData(): Cropper.ContainerData {
        return this.cropper.getContainerData();
    }

    setData(data: Cropper.SetDataOptions): Cropper {
        return this.cropper.setData(data);
    }

    getData(rounded: boolean): Cropper.Data {
        return this.cropper.getData(rounded);
    }

    crop(image: string, callBack: () => void) {

        if (this.onCrop) {
            this.onCrop(image);
        }

        this.cropResult = image;
        return callBack();
    }

    refreshCropper(callBack: () => void) {
        this.cropResult = "";
        this.isLoading = true;

        return callBack();
    }

    onCropClick(e: Event): Cropper {
        if (typeof this.cropper.getCroppedCanvas() === "undefined") {
            return;
        }

        this.refreshCropper(() => {
            setTimeout(() => {
                this.crop(this.cropper.getCroppedCanvas().toDataURL(), () => {
                    this.isLoading = false;
                    this.dismissCropper();
                });
            }, 100);
        });

        e.preventDefault();
    }

    onReset(): Cropper {
        this.cropResult = "";
        this.src = "";
        if (this.onCrop) {
            this.onCrop(this.cropResult);
        }
        return this.cropper.reset();
    }

    move(offsetX: number, offsetY: number): Cropper {
        return this.cropper.move(offsetX, offsetY);
    }

    onMoveTo(x: number, y?: number): Cropper {
        return this.cropper.moveTo(x, y);
    }

    zoom(ratio: number): Cropper {
        return this.cropper.zoom(ratio);
    }

    OnZoomTo(ratio: number): Cropper {
        return this.cropper.zoomTo(ratio);
    }

    rotate(degree: number): Cropper {
        return this.cropper.rotate(degree);
    }

    onRotateTo(degree: number): Cropper {
        return this.cropper.rotateTo(degree);
    }

    onEnable(): Cropper {
        return this.cropper.enable();
    }

    disable(): Cropper {
        return this.cropper.disable();
    }

    clear(): Cropper {
        return this.cropper.clear();
    }

    replace(url: string, onlyColorChanged: boolean): Cropper {
        return this.cropper.replace(url, onlyColorChanged);
    }

    scale(scaleX: number, scaleY: number): Cropper {
        return this.cropper.scale(scaleX, scaleY);
    }

    setXScale(scaleX: number): Cropper {
        return this.cropper.scaleX(scaleX);
    }

    setYScale(scaleY: number): Cropper {
        return this.cropper.scaleY(scaleY);
    }

}
