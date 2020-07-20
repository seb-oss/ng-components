import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-textboxgroup-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-textboxgroup></sebng-textboxgroup>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class TextboxgroupPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/textboxGroup/textboxGroup.component");
    snippet: string = `<sebng-textboxgroup></sebng-textboxgroup>`;

    constructor() {
        document.title = "Textboxgroup - SEB Angular Components";
    }

    ngOnInit(): void {}
}
