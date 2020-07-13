import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-checkbox-page",
    templateUrl: "./checkbox-page.component.html",
})
export class CheckboxPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/checkbox/checkbox.component");
    model: boolean;
    showDescription: boolean;

    constructor() {
        document.title = "Checkbox - SEB Angular Components";
    }

    ngOnInit(): void {}
}
