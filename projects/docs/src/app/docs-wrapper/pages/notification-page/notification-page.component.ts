import { Component } from "@angular/core";
import { DropdownItem } from "@sebgroup/ng-components/dropdown";
import { NotificationTheme, NotificationPosition, NotificationStyle, NotificationAction } from "projects/ng-components/public-api";

@Component({
    selector: "app-notification-page",
    templateUrl: "./notification-page.component.html",
})
export class NotificationPageComponent {
    themeList: Array<DropdownItem<NotificationTheme>> = [
        { label: "purple", value: "purple", key: "purple" },
        { label: "primary", value: "primary", key: "primary" },
        { label: "danger", value: "danger", key: "danger" },
        { label: "success", value: "success", key: "success" },
        { label: "warning", value: "warning", key: "warning" },
        { label: "inverted", value: "inverted", key: "inverted" },
    ];
    positionList: Array<DropdownItem<NotificationPosition>> = [
        { label: "bottom-left", value: "bottom-left", key: "bottom-left" },
        { label: "bottom-right", value: "bottom-right", key: "bottom-right" },
        { label: "top-left", value: "top-left", key: "top-left" },
        { label: "top-right", value: "top-right", key: "top-right" },
    ];
    positionBarList: Array<DropdownItem<NotificationPosition>> = [
        { label: "top", value: "top", key: "top" },
        { label: "bottom", value: "bottom", key: "bottom" },
    ];
    styleList: Array<DropdownItem<NotificationStyle>> = [
        { label: "slide-in", value: "slide-in", key: "slide-in" },
        { label: "bar", value: "bar", key: "bar" },
    ];
    actions: Array<NotificationAction> = [
        { text: "Remind me later", action: () => (this.toggle = false) },
        { text: "Dismiss", action: () => (this.toggle = false) },
    ];

    importString: string = require("!raw-loader!@sebgroup/ng-components/notification/notification.component");
    snippet: string = `<sebng-notification
    [toggle]="toggle"
    title="Notification Title"
    message="message"
    (onDismiss)="toggle = false"
></sebng-notification>`;
    toggle: boolean;

    style: DropdownItem<NotificationStyle> = this.styleList[0];
    theme: DropdownItem<NotificationTheme> = this.themeList[0];
    position: DropdownItem<NotificationPosition> = this.positionList[0];
    positionBar: DropdownItem<NotificationPosition> = this.positionBarList[0];
    dismissable: boolean = false;
    persist: boolean = false;
    showActions?: boolean = false;
    showTitle?: boolean = true;

    constructor() {
        document.title = "Notification - SEB Angular Components";
    }
}
