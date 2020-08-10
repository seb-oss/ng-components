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
import { TableService } from "@sebgroup/ng-components/table";

@Component({
    selector: "app-my-table",
    template: \`<sebng-table [rows]="rows$ | async" [headerList]="headerList$ | async"></sebng-table>\`
    // STEP 1: Import and provide the service. (Each instance of a table should use it's own service).
    providers: [TableService],
})
export class MyTableComponent {
    rawData = ${JSON.stringify(rawDataNotesExample, null, 4)}      
    rows$;
    headerList$;

    constructor(private tableService: TableService<any>) {
        // STEP 2: Register the raw data with an optional cofiguration
        this.tableService.registerDatasource(this.rawData);

        // STEP 3: Fetch the rows and header to use with the component
        this.rows$ = this.tableService.currentTable;
        this.headerList$ = this.tableService.tableHeaderList;
    }
}
`;

export const tableServiceSortSnippet: string = `
@Component({
    // Bind the sort properties to the template
    template: \`<sebng-table [sortInfo]="sortInfo$ | async" (sortClicked)="changeSort($event)" ... ></sebng-table>\` 
})
export class MyTableComponent {
    ...

    sortInfo$;
    changeSort;

    constructor(private tableService: TableService<any>) {
        // Set the initial sort information in the configuration and register the data
        const tableConfig = {
            sort: { column: "country", isAscending: true, type: "string" }
        };
        this.tableService.registerDatasource(this.rawData, tableConfig);

        ...

        // Fetch the current sort info and handleSort to use with the component
        this.sortInfo$ = this.tableService.currentSortInfo;
        this.changeSort = this.tableService.handleChangeSort;
    }
}
`;
