import { Component, OnInit } from "@angular/core";
import { TableService } from "@sebgroup/ng-components/table";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-table-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-table [rows]="rows$ | async" [headerList]="headerList$ | async"></sebng-table>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
            <ng-container notes> // TODO: Add info about the table service </ng-container>
        </app-doc-page>
    `,
    providers: [TableService],
})
export class TablePageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/table/table.component");
    snippet: string = `<sebng-table [rows]="rows$ | async" [headerList]="headerList$ | async"></sebng-table>`;
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
