import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-notification-page",
    templateUrl: "./notification-page.component.html",
})
export class NotificationPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/notification/notification.component");
    snippet: string = `<sebng-notification [toggle]="toggle" title="Notification Title" message="message"></sebng-notification>`;
    toggle: boolean;
    constructor() {
        document.title = "Notification - SEB Angular Components";
    }

    ngOnInit(): void {}
}
