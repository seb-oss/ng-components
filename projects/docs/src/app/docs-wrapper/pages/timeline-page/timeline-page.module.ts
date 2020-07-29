import { NgModule } from "@angular/core";
import { TimelineModule } from "@sebgroup/ng-components/timeline";
import { TimelinePageComponent } from "./timeline-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { TimelinePageRoutingModule } from "./timeline-page-routing.module";

@NgModule({
    declarations: [TimelinePageComponent],
    imports: [CommonModule, TimelinePageRoutingModule, FormsModule, DocPageModule, TimelineModule],
})
export class TimelinePageModule {}
