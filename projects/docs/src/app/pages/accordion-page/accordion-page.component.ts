import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-accordion-page",
    templateUrl: "./accordion-page.component.html",
})
export class AccordionPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/accordion/accordion.component");

    constructor() {
        document.title = "Accordion - SEB Angular Components";
    }

    ngOnInit(): void {}
}
