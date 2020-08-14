export const rawDataNotesExample: any[] = [
    { country: "United Kingdom", currency: "GBP" },
    { country: "China", currency: "CNY" },
    { country: "India", currency: "INR" },
];

export const simpleTableHTML: string = `<sebng-table 
    [rows]="data" 
    [headerList]="[
        { tableKeySelector: 'country', label: 'Country', valueType: 'string' },
        { tableKeySelector: 'currency', label: 'Currency code', valueType: 'string' }
    ]"
></sebng-table>`;

export const tableServiceExampleSnippet: string = `
import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableService, TableHeaderListItem, TableServiceDataAndHandlers } from "@sebgroup/ng-components/table";

@Component({
    selector: "app-my-table",
    template: \`
    <sebng-table
        [rows]="rows$ | async"
        [headerList]="headerList$ | async"
    ></sebng-table>
    \`,
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

    constructor(private tableService: TableService) {
        const { get }: TableServiceDataAndHandlers = this.tableService.registerDatasource("my-table", this.rawData);
        this.rows$ = get.rows;
        this.headerList$ = get.headerList;
    }
}
`;

export const tableServiceSortSnippet: string = `
...
import { TableService, TableConfig, SortInfo, TableHeaderListItem, TableServiceDataAndHandlers } from "@sebgroup/ng-components/table";

@Component({
    ...
    template: \`
    <sebng-table
        ...
        [sortInfo]="sortInfo$ | async"
        (sortClicked)="sort($event)"
    ></sebng-table>
    \`,
})
export class MyTableComponent {
    ...
    sortInfo$: BehaviorSubject<SortInfo>;
    sort: (selectedColumn: string | number | symbol) => void;

    constructor(private tableService: TableService) {
        const tableConfig: TableConfig<any> = {
            sort: { column: "country", isAscending: true, type: "string" },
        };
        const { get, handle }: TableServiceDataAndHandlers = this.tableService.registerDatasource(
            "my-table",
            this.rawData,
            tableConfig
        );
        ...
        this.sortInfo$ = get.sortInfo;
        this.sort = handle.sort;
    }
}
`;
