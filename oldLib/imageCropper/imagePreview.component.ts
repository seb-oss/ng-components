import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ac-image-preview",
    templateUrl: "./imagePreview.component.html",
    styleUrls: ["./imagePreview.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class ImagePreviewComponent implements OnInit, OnChanges {
    @Input() cropResult?: string;
    @Input() previewSrc?: string;
    @Input() handleUploadImage: (e: any, cropResult?: string) => void;
    @Input() selectButtonText?: string;
    @Input() previewClassName?: string;
    @ViewChild("fileInput") fileInput: ElementRef;

    cropDataResult: string;

    onFileInputClick(e: Event) {
        if (this.previewSrc) {
            this.handleUploadImage(e, (this.previewSrc));
        } else {
            this.fileInput.nativeElement.click();
        }
    }

    ngOnInit() {
        this.cropDataResult = this.previewSrc ? this.previewSrc : "";
    }

    ngOnChanges(changes: SimpleChanges) {
        if ((changes.cropResult && !changes.cropResult.isFirstChange()) && changes.cropResult.currentValue !== changes.cropResult.previousValue) {
            this.cropDataResult = changes.cropResult.currentValue;
        }
    }

    fileInputClick(e: any) {
        if (e.target && e.target.value) {
            e.target.value = null;
        }
    }
}
