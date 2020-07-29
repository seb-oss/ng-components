import { NgModule } from "@angular/core";
import { NotificationModule } from "@sebgroup/ng-components/notification";
import { NotificationPageComponent } from "./notification-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { NotificationPageRoutingModule } from "./notification-page-routing.module";

@NgModule({
    declarations: [NotificationPageComponent],
    imports: [CommonModule, NotificationPageRoutingModule, FormsModule, DocPageModule, NotificationModule, DropdownModule, CheckboxModule],
})
export class NotificationPageModule {}
