import { Component } from "@angular/core";

@Component({
    selector: "app-toggle-page",
    templateUrl: "./toggle-selector-page.component.html",
})
export class ToggleSelectorPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/toggle-selector/toggle-selector.component");
    code: string = `<sebng-toggle-loader ></sebng-toggle-loader>`;

    disabled: boolean = false;
    checked: boolean = false;
    label: string = "Lorem ipsum";
    toggle: boolean = false;
    notificationMessage: string = "";
    notificationToggle: boolean = false;

    list: any = [
        { value: "1", label: "First", description: "with description" },
        { value: "2", label: "Second" },
        { value: "3", label: "Third (disabled)", disabled: true },
        { value: "4", customTemplate: "<code>4️⃣ Fourth (using custom template)</code> 😊" },
        { value: "5", label: "Fifth" },
    ];
    model: any = this.list;
    multi: boolean = false;

    constructor() {
        document.title = "Toggle Selector - SEB Angular Components";
    }
}
