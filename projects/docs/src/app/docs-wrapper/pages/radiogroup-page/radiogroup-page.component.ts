import { Component, OnInit } from "@angular/core";
import { RadioGroupItem } from "projects/ng-components/public-api";

@Component({
    selector: "app-radiogroup-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-radio-group [list]="list"></sebng-radio-group>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class RadioGroupPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/radio-group/radio-group.component");
    snippet: string = `<sebng-radio-group [list]="list"></sebng-radio-group>`;

    list: RadioGroupItem[] = [
        { key: "One", value: "1", label: "One", description: "Description" },
        { key: "Two", value: "2", label: "Two" },
    ];

    constructor() {
        document.title = "RadioGroup - SEB Angular Components";
    }

    ngOnInit(): void {}
}
