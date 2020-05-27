import { Component } from "@angular/core";
import { NotificationAction } from "lib/src/notification";

@Component({
    selector: "app-notification",
    templateUrl: "./notification.component.html",
})
export class NotificationComponent {
    public notification1Toggle: boolean = false;
    public notification2Toggle: boolean = false;
    public notification3Toggle: boolean = false;

    public description: string = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    public notificationActions: Array<NotificationAction> = [
        { text: "Yes, I'm in", action: () => this.onToggle2(false) },
        { text: "Ignore", action: () => this.onToggle2(false) },
    ];

    onClick(e: MouseEvent) {}

    onDismiss(): void {
        this.notification1Toggle = false;
        this.notification2Toggle = false;
        this.notification3Toggle = false;
    }

    onToggle(value: boolean): void {
        this.notification1Toggle = value;
    }

    onToggle2(value: boolean): void {
        this.notification2Toggle = value;
    }

    onToggle3(value: boolean): void {
        this.notification3Toggle = value;
    }

    onNotificationClick(): void {}
}
