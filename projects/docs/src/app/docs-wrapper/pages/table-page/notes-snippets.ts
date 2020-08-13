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
import { TableService, TableHeaderListItem, TableServicePublicApi } from "@sebgroup/ng-components/table";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-my-table",
    template: \`<sebng-table
        [rows]="rows$ | async"
        [headerList]="headerList$ | async"
    ></sebng-table>\`,
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
        const api: TableServicePublicApi = this.tableService.registerDatasource("my-table", this.rawData);
        this.rows$ = api.getSubscription("currentTable");
        this.headerList$ = api.getSubscription("tableHeaderList");
    }
}
`;

export const tableServiceSortSnippet: string = `\
...
import { TableService, TableConfig, SortInfo, TableServicePublicApi } from "@sebgroup/ng-components/table";
import { BehaviorSubject } from "rxjs";

@Component({
    template: \`<sebng-table
        ...
        [sortInfo]="sortInfo$ | async"
        (sortClicked)="sort($event)"
    ></sebng-table>\`,
})
export class MyTableComponent {\
    ...
    sortInfo$: BehaviorSubject<SortInfo<string | number | symbol>>;
    sort: (selectedColumn: string | number | symbol) => void;

    constructor(private tableService: TableService) {
        const tableConfig: TableConfig<any> = {
            sort: { column: "country", isAscending: true, type: "string" },
        };
        const api: TableServicePublicApi = this.tableService.registerDatasource("my-table", this.rawData, tableConfig);
        ...
        this.sortInfo$ = api.getSubscription("currentSortInfo");
        this.sort = api.handle("changeSort");
    }
}`;
