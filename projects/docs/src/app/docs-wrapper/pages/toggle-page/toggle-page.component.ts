import { Component } from "@angular/core";

@Component({
    selector: "app-toggle-page",
    templateUrl: "./toggle-page.component.html",
})
export class TogglePageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/toggle/toggle.component");
    code: string = `<sebng-toggle [(ngModel)]="value"></sebng-toggle>`;

    disabled: boolean = false;
    checked: boolean = false;
    label: string = "Lorem ipsum";
    toggle: boolean = false;
    notificationMessage: string = "";
    notificationToggle: boolean = false;

    constructor() {
        document.title = "Toggle - SEB Angular Components";
    }
}
