import { Component, OnInit } from "@angular/core";
import { TabsListItem } from "@sebgroup/ng-components/tabs";

@Component({
    selector: "app-tabs-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-tabs [list]="list"></sebng-tabs>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class TabsPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/tabs/tabs.component");
    snippet: string = `<sebng-tabs [list]="list"></sebng-tabs>`;
    list: Array<TabsListItem> = [
        { text: "First", disabled: false },
        { text: "Second", disabled: false },
        { text: "Third", disabled: false },
        { text: "Fourth", disabled: true },
    ];

    constructor() {
        document.title = "Tabs - SEB Angular Components";
    }

    ngOnInit(): void {}
}
