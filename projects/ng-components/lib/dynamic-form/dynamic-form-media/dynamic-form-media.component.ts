import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { Media, MediaKind } from "../model/dynamicFormItem";

@Component({
    selector: "app-dynamic-form-media",
    templateUrl: "./dynamic-form-media.component.html",
    styleUrls: ["./dynamic-form-media.component.scss"],
})
export class DynamicFormMediaComponent {
    @Input() media: Media;
    @ViewChild("img") image: ElementRef;
    imgHeight: number;

    get mediaPath(): SafeResourceUrl | SafeUrl | string | null {
        if (this.media?.url) {
            switch (this.media.kind) {
                case MediaKind.Image:
                    return this.media.url;
                case MediaKind.Video:
                    return this.media.url;
            }
        } else {
            return null;
        }
    }

    /**
     * Calculate image height based on the current width, the origin width and the origin height
     * height = currentWidth * naturalHeight / naturalWidth
     */
    calculateHeight(): void {
        if (this.image) {
            this.imgHeight =
                (this.image.nativeElement.offsetWidth * this.image.nativeElement.naturalHeight) / this.image.nativeElement.naturalWidth;
        }
    }
}
