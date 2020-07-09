import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationComponent } from "./notification.component";

@NgModule({
    imports: [CommonModule],
    declarations: [NotificationComponent],
    exports: [NotificationComponent],
})
export class NotificationModule {}
