import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-stepper-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-stepper></sebng-stepper>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class StepperPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/stepper/stepper.component");
    snippet: string = `<sebng-stepper></sebng-stepper>`;

    constructor() {
        document.title = "Stepper - SEB Angular Components";
    }

    ngOnInit(): void {}
}
