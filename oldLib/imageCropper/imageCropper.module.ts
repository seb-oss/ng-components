import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageCropperComponent } from "./imageCropper.component";
import { ImagePreviewComponent } from "./imagePreview.component";
import { LoaderComponent } from "./loader.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ImageCropperComponent, ImagePreviewComponent, LoaderComponent],
    exports: [ImageCropperComponent]
})
export class ImageCropperModule { }
