import { Component } from "@angular/core";

@Component({
    selector: "app-checkbox-page",
    templateUrl: "./textlabel-page.component.html",
})
export class TextlabelPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/textLabel/textLabel.component");
    customLabelValue: boolean = false;

    constructor() {
        document.title = "Textlabel - SEB Angular Components";
    }
}
