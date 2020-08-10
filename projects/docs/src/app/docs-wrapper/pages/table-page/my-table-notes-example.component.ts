import { Component } from "@angular/core";
import { TableService, TableConfig, SortInfo, TableHeaderListItem } from "@sebgroup/ng-components/table";
import { BehaviorSubject } from "rxjs";
// This component is being used to show the output of the example in the notes for sorting

@Component({
    selector: "app-my-table",
    template: `<sebng-table
        [rows]="rows$ | async"
        [headerList]="headerList$ | async"
        [sortInfo]="sortInfo$ | async"
        (sortClicked)="changeSort($event)"
    ></sebng-table>`,
    providers: [TableService],
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
    sortInfo$: BehaviorSubject<SortInfo<string | number | symbol>>;
    changeSort: (selectedColumn: string | number | symbol) => void;

    constructor(private tableService: TableService<any>) {
        const tableConfig: TableConfig<any> = {
            sort: { column: "country", isAscending: true, type: "string" },
        };
        this.tableService.registerDatasource(this.rawData, tableConfig);
        this.rows$ = this.tableService.currentTable;
        this.headerList$ = this.tableService.tableHeaderList;
        this.sortInfo$ = this.tableService.currentSortInfo;
        this.changeSort = this.tableService.handleChangeSort;
    }
}
