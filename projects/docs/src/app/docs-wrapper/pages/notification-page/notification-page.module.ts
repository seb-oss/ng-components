import { NgModule } from "@angular/core";
import { NotificationModule } from "@sebgroup/ng-components/notification";
import { NotificationPageComponent } from "./notification-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";

const routes: Routes = [{ path: "", component: NotificationPageComponent }];

@NgModule({
    declarations: [NotificationPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, NotificationModule, DropdownModule, CheckboxModule],
    exports: [RouterModule, NotificationModule],
})
export class NotificationPageModule {}
