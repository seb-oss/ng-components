import { NgModule } from "@angular/core";
import { TimelineModule } from "@sebgroup/ng-components/timeline";
import { TimelinePageComponent } from "./timeline-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: TimelinePageComponent }];

@NgModule({
    declarations: [TimelinePageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, TimelineModule],
    exports: [RouterModule, TimelineModule],
})
export class TimelinePageModule {}
