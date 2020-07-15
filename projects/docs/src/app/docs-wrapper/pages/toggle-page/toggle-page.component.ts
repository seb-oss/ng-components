import { Component, OnInit, TemplateRef, ElementRef } from "@angular/core";
import { TooltipTrigger, TooltipPosition, TooltipTheme } from "@sebgroup/ng-components/tooltip";

@Component({
    selector: "app-toggle-page",
    templateUrl: "./toggle-page.component.html",
})
export class TogglePageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/toggle/toggle.component");
    code: string = `<sebng-toggle></sebng-toggle>`;

    disabled: boolean = false;
    checked: boolean = false;
    label: string = "Checkbox";
    isToggled: boolean = false;
    notificationMessage: string = "";

    constructor() {
        document.title = "Toggle - SEB Angular Components";
    }

    ngOnInit(): void {}

    onCheckboxChange(): void {
        this.isToggled = true;
        this.notificationMessage = `Checkbox is set to ${this.checked}`;
    }
}
