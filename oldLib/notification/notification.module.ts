import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationComponent } from "./notification.component";
import { SafeHtmlPipe } from "./notification.pipe";

@NgModule({
    imports: [CommonModule],
    exports: [NotificationComponent],
    declarations: [NotificationComponent, SafeHtmlPipe]
})
export class NotificationModule { }
