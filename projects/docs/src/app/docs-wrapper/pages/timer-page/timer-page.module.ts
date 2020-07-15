import { NgModule } from "@angular/core";
import { TimerModule } from "@sebgroup/ng-components/timer";
import { NotificationModule } from "@sebgroup/ng-components/notification";
import { TimerPageComponent } from "./timer-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: TimerPageComponent }];

@NgModule({
    declarations: [TimerPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, TimerModule, NotificationModule],
    exports: [RouterModule, TimerModule],
})
export class TimerPageModule {}
