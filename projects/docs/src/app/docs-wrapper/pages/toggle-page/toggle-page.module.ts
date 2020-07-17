import { NgModule } from "@angular/core";
import { TogglePageComponent } from "./toggle-page.component";
import { ToggleModule } from "@sebgroup/ng-components/toggle";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { NotificationModule } from "@sebgroup/ng-components/notification";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";

const routes: Routes = [{ path: "", component: TogglePageComponent }];

@NgModule({
    declarations: [TogglePageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, ToggleModule, NotificationModule, CheckboxModule],
    exports: [RouterModule, ToggleModule],
})
export class TogglePageModule {}
