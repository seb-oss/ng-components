import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-button-page",
    templateUrl: "./button-page.component.html",
})
export class ButtonPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/button/button.component");
    snippet: string = `<sebng-button>Button label</sebng-button>`;

    constructor() {
        document.title = "Button - SEB Angular Components";
    }

    ngOnInit(): void {}
}
