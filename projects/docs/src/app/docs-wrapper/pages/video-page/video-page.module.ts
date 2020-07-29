import { NgModule } from "@angular/core";
import { VideoPageComponent } from "./video-page.component";
import { VideoModule } from "@sebgroup/ng-components/video";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { TooltipModule } from "@sebgroup/ng-components/tooltip";
import { VideoPageRoutingModule } from "./video-page-routing.module";

@NgModule({
    declarations: [VideoPageComponent],
    imports: [CommonModule, VideoPageRoutingModule, FormsModule, DocPageModule, VideoModule, CheckboxModule, TooltipModule],
})
export class VideoPageModule {}
