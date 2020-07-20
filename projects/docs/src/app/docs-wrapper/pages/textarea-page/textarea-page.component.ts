import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-textarea-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-textarea [(ngModel)]="value"></sebng-textarea>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class TextareaPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/textarea/textarea.component");
    snippet: string = `<sebng-textarea></sebng-textarea>`;
    value: string = "";

    constructor() {
        document.title = "Textarea - SEB Angular Components";
    }

    ngOnInit(): void {}
}
