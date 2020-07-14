import { NgModule } from "@angular/core";
import { VideoPageComponent } from "./video-page.component";
import { VideoModule } from "@sebgroup/ng-components/video";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";
import { TextboxGroupModule } from "@sebgroup/ng-components/textboxGroup";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { TooltipModule } from "@sebgroup/ng-components/tooltip";

const routes: Routes = [{ path: "", component: VideoPageComponent }];

@NgModule({
    declarations: [VideoPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        DocPageModule,
        VideoModule,
        DropdownModule,
        TextboxGroupModule,
        CheckBoxModule,
        TooltipModule,
    ],
    exports: [RouterModule, VideoModule],
})
export class VideoPageModule {}
