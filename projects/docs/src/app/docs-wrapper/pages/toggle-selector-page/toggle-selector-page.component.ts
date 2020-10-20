import { Component } from "@angular/core";

@Component({
    selector: "app-toggle-page",
    templateUrl: "./toggle-selector-page.component.html",
})
export class ToggleSelectorComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/toggle/toggle.component");
    code: string = `<sebng-toggle-loader ></sebng-toggle-loader>`;

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
