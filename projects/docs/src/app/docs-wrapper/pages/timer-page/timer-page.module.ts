import { NgModule } from "@angular/core";
import { TimerModule } from "@sebgroup/ng-components/timer";
import { TimerPageComponent } from "./timer-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { TimerPageRoutingModule } from "./timer-page-routing.module";

@NgModule({
    declarations: [TimerPageComponent],
    imports: [CommonModule, TimerPageRoutingModule, FormsModule, DocPageModule, TimerModule],
})
export class TimerPageModule {}
