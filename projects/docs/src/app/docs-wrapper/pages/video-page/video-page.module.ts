import { NgModule } from "@angular/core";
import { VideoPageComponent } from "./video-page.component";
import { VideoModule } from "@sebgroup/ng-components/video";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: VideoPageComponent }];

@NgModule({
    declarations: [VideoPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, VideoModule],
    exports: [RouterModule, VideoModule],
})
export class VideoPageModule { }
