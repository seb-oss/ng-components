import { Component } from "@angular/core";

@Component({
    selector: "app-checkbox-page",
    templateUrl: "./checkbox-page.component.html",
})
export class CheckboxPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/checkBox/checkbox.component");
    model: boolean;
    showDescription: boolean;
    disableCheckbox: boolean = false;
    errorCheckbox: boolean = false;
    customErrorCheckbox: boolean = false;
    customDescriptionCheckbox: boolean = false;

    constructor() {
        document.title = "Checkbox - SEB Angular Components";
    }
}
