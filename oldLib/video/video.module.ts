import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VideoComponent } from "./video.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [VideoComponent],
    exports: [VideoComponent]
})
export class VideoModule { }
