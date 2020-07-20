import { Component, OnInit } from "@angular/core";
import { TableService } from "@sebgroup/ng-components/table";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-table-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-table
                    class="w-100"
                    [rows]="rows$ | async"
                    [headerList]="headerList$ | async"
                    [selectable]="selectable"
                    [fixedHeight]="hasFixedHeight ? height + 'px' : null"
                ></sebng-table>
            </ng-container>
            <div class="row" controls>
                <sebng-checkbox
                    [(ngModel)]="selectable"
                    label="Selectable"
                    description="Enable selectable rows with checkboxes"
                ></sebng-checkbox>

                <sebng-checkbox
                    [(ngModel)]="hasFixedHeight"
                    label="Fixed Height"
                    description="Preserve table height and scroll the content"
                ></sebng-checkbox>

                <label *ngIf="hasFixedHeight" class="p-3"
                    >Table height
                    <p><small>Set the height of the table (in px)</small></p>
                    <sebng-stepper [(ngModel)]="height" [min]="20" [max]="200" [step]="5"></sebng-stepper>
                </label>
            </div>
            <ng-container code>{{ snippet }}</ng-container>
            <ng-container notes> // TODO: Add info about the table service </ng-container>
        </app-doc-page>
    `,
    providers: [TableService],
})
export class TablePageComponent {
    // controls
    selectable: boolean = false;
    hasFixedHeight: boolean = false;
    height: number = 80;

    importString: string = require("!raw-loader!@sebgroup/ng-components/table/table.component");
    snippet: string = `<sebng-table
    [rows]="rows$ | async"
    [headerList]="headerList$ | async"
    [selectable]="selectable"
    [fixedHeight]="hasFixedHeight ? height + 'px' : null"
></sebng-table>`;
    data: any[] = [
        { country: "Malaysia", currency: "RM" },
        { country: "Slovenia", currency: "EUR", language: "Slovenian" },
        { country: "Iraq", currency: "IQD" },
        { country: "Nigeria", language: "English" },
    ];
    rows$: BehaviorSubject<any>;
    headerList$: BehaviorSubject<any>;

    constructor(private tableService: TableService<any>) {
        document.title = "Table - SEB Angular Components";

        this.tableService.registerDatasource(this.data);
        this.rows$ = this.tableService.currentTable;
        this.headerList$ = this.tableService.tableHeaderList;
    }
}
