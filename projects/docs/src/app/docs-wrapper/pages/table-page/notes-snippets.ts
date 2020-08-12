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
    // STEP 3: Bind the values you need from table service to your template
    template: \`<sebng-table [rows]="tableService.currentTable | async" [headerList]="tableService.tableHeaderList | async"></sebng-table>\`
    // STEP 1: Import and provide the service. (Each instance of a table should use it's own service).
    providers: [TableService],
})
export class MyTableComponent {
    rawData any[] = ${JSON.stringify(rawDataNotesExample, null, 4)}      

    constructor(public tableService: TableService<any>) {
        // STEP 2: Register the raw data with an optional cofiguration
        this.tableService.registerDatasource(this.rawData);
    }
}
`;

export const tableServiceSortSnippet: string = `
import { TableConfig } from "@sebgroup/ng-components/table";

@Component({
    ...
    // STEP 2: Bind the sort properties and methods to the template
    template: \`<sebng-table [sortInfo]="tableService.currentSortInfo | async" (sortClicked)="tableService.handleChangeSort($event)" ... ></sebng-table>\` 
    ...
})
export class MyTableComponent {
    ...
    constructor(public tableService: TableService<any>) {
        // STEP 1: Add sort info to the table config when registering data
        const tableConfig: TableConfig<any> = {
            sort: { column: "country", isAscending: true, type: "string" }
        };
        this.tableService.registerDatasource(this.rawData, tableConfig);
    }
}
`;
