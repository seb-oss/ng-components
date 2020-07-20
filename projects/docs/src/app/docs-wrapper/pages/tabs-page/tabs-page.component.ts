import { Component } from "@angular/core";
import { TabsListItem } from "@sebgroup/ng-components/tabs";

@Component({
    selector: "app-tabs-page",
    template: `
        <app-doc-page [importString]="importString" [centered]="true">
            <ng-container example>
                <div>
                    <sebng-tabs [(ngModel)]="value" [list]="list"></sebng-tabs>
                    <div *ngFor="let item of list; index as i">
                        <div class="bg-light p-3" [style.height.px]="100" *ngIf="value === i">{{ item.text }} page</div>
                    </div>
                </div>
            </ng-container>
            <ng-container controls>
                <label>Active index</label>
                <p><small>Set the index of the currently selected item</small></p>
                <sebng-stepper [(ngModel)]="value" min="0" [max]="list.length - 1"></sebng-stepper>
            </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class TabsPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/tabs/tabs.component");
    snippet: string = `<sebng-tabs
    [(ngModel)]="value"
    [list]="[
        { text: "First", disabled: false },
        { text: "Second", disabled: false },
        { text: "Third", disabled: false },
        { text: "Fourth", disabled: true },
    ]"
></sebng-tabs>
<div *ngFor="let item of list; index as i">
    <div class="bg-light p-3" [style.height.px]="100" *ngIf="value === i">{{ item.text }} page</div>
</div>`;
    list: Array<TabsListItem> = [
        { text: "First", disabled: false },
        { text: "Second", disabled: false },
        { text: "Third", disabled: false },
        { text: "Fourth", disabled: true },
    ];
    value: number = 0;

    constructor() {
        document.title = "Tabs - SEB Angular Components";
    }
}
