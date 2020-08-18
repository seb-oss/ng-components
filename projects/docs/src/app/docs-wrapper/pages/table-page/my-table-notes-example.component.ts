import { Component } from "@angular/core";
import { TableService, TableConfig, SortInfo, TableHeaderListItem, TableServiceDataAndHandlers } from "@sebgroup/ng-components/table";
import { BehaviorSubject } from "rxjs";
// This component is being used to show the output of the example in the notes for sorting

@Component({
    selector: "app-my-table",
    template: `<sebng-table
        [rows]="rows$ | async"
        [headerList]="headerList$ | async"
        [sortInfo]="sortInfo$ | async"
        (sortClicked)="sort($event)"
    ></sebng-table>`,
})
export class MyTableComponent {
    rawData = [
        {
            country: "United Kingdom",
            currency: "GBP",
        },
        {
            country: "China",
            currency: "CNY",
        },
        {
            country: "India",
            currency: "INR",
        },
    ];
    rows$: BehaviorSubject<any[]>;
    headerList$: BehaviorSubject<TableHeaderListItem<any>[]>;
    sortInfo$: BehaviorSubject<SortInfo>;
    sort: (selectedColumn: string | number | symbol) => void;

    constructor(private tableService: TableService) {
        const tableConfig: TableConfig<any> = {
            sort: { column: "country", isAscending: true, type: "string" },
        };
        const { get, handle }: TableServiceDataAndHandlers = this.tableService.registerDatasource("my-table", this.rawData, tableConfig);
        this.rows$ = get.rows;
        this.headerList$ = get.headerList;
        this.sortInfo$ = get.sortInfo;
        this.sort = handle.sort;
    }
}
