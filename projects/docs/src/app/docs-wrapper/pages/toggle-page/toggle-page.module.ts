import { NgModule } from "@angular/core";
import { TogglePageComponent } from "./toggle-page.component";
import { ToggleModule } from "@sebgroup/ng-components/toggle";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { NotificationModule } from "@sebgroup/ng-components/notification";
import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";

const routes: Routes = [{ path: "", component: TogglePageComponent }];

@NgModule({
    declarations: [TogglePageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, ToggleModule, NotificationModule, CheckBoxModule],
    exports: [RouterModule, ToggleModule],
})
export class TogglePageModule {}
