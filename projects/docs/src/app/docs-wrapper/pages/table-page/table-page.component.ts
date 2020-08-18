import { Component } from "@angular/core";
import { TableService, TableConfig, TableTHeadTheme, TableServiceDataAndHandlers } from "@sebgroup/ng-components/table";
import { DropdownItem } from "@sebgroup/ng-components/dropdown";
import { simpleTableHTML, tableServiceExampleSnippet, tableServiceSortSnippet, rawDataNotesExample } from "./notes-snippets";

interface TablePageData {
    country: string;
    currency?: string;
    language?: string;
    founded?: Date;
}

@Component({
    selector: "app-table-page",
    templateUrl: "./table-page.component.html",
})
export class TablePageComponent {
    tableData: TableServiceDataAndHandlers<TablePageData>["get"];
    tableHandlers: TableServiceDataAndHandlers<TablePageData>["handle"];
    tableId: string = "table-page-table";
    itemsPerPage: number = 4;
    // controls
    compact: boolean = true;
    striped: boolean = false;
    dark: boolean = false;
    selectable: boolean = false;
    hasFixedHeight: boolean = false;
    height: number = 130;

    importString: string = require("!raw-loader!@sebgroup/ng-components/table/table.component");
    snippet = (sortInfo: string, fixedHeight: boolean, height: number, selectable: boolean, compact: boolean, striped: boolean): string => {
        return `
<sebng-table
    [compact]="${compact}"
    [striped]="${striped}"
    [selectable]="${selectable}"
    [rows]="rows"
    [headerList]="headerList"
    [sortInfo]="${JSON.stringify(sortInfo).replace(/"/g, "'")}"${
            fixedHeight
                ? `
    [fixedHeight]="${height} + 'px'"}
    `
                : `
    `
        }(sortClicked)="sort($event)"
    (rowClicked)="rowClicked($event.index)"
></sebng-table>
       `;
    };

    // snippets and example data used in notes
    rawDataNotesExample: any[] = rawDataNotesExample;
    simpleTableHTML: string = simpleTableHTML;
    tableServiceExampleSnippet: string = tableServiceExampleSnippet;
    tableServiceSortSnippet: string = tableServiceSortSnippet;

    data: TablePageData[] = [
        { country: "Malaysia", currency: "RM" },
        { country: "Slovenia", currency: "EUR", language: "Slovenian", founded: new Date(1918, 9, 29) },
        { country: "Iraq", currency: "IQD" },
        { country: "Nigeria", language: "English" },
        { country: "Iceland", currency: "ISK", founded: new Date(1944, 5, 17) },
        { country: "Lithuania", currency: "EUR", language: "Lithuanian" },
        { country: "Spain", language: "Spanish" },
        { country: "United Kingdom", currency: "GBP" },
        { country: "China", currency: "CNY", language: "Mandarin", founded: new Date(1949, 9, 1) },
        { country: "India", currency: "INR", language: "Hindi" },
    ];
    columns: TableConfig<TablePageData>["columns"] = ["country", "currency", "language", "founded"];
    types: TableConfig<TablePageData>["types"] = {
        founded: "date",
    };
    columnsDropdownList: DropdownItem<keyof TablePageData>[] = [
        ...this.columns.map((value: keyof TablePageData) => {
            return { value, label: value.replace(/(\b[a-z](?!\s))/g, x => x.toUpperCase()) };
        }),
    ];
    selectedColumnsDropdownList: DropdownItem<keyof TablePageData>[] = [...this.columnsDropdownList];
    sortDropdownList: DropdownItem<keyof TablePageData>[] = [
        {
            value: null,
            label: "None",
        },
        ...this.columnsDropdownList,
    ];
    theadThemeList: DropdownItem<TableTHeadTheme>[] = [
        { label: "None", value: null },
        { label: "Dark", value: "dark" },
        { label: "Light", value: "light" },
    ];
    selectedTheadTheme: DropdownItem<TableTHeadTheme> = this.theadThemeList[0];

    constructor(public tableService: TableService) {
        document.title = "Table - SEB Angular Components";

        const { get, handle } = this.tableService.registerDatasource<TablePageData>(this.tableId, this.data, {
            types: this.types,
            pagination: { maxItems: this.itemsPerPage },
        });
        this.tableData = get;
        this.tableHandlers = handle;
    }

    getDropdownItemByColumnName = (col: string): DropdownItem<keyof TablePageData> => {
        return this.sortDropdownList.find(e => e.value === col);
    };

    getColumnsFromDropdownList = (list: DropdownItem<keyof TablePageData>[]): (keyof TablePageData)[] => {
        return list.map(e => e.value);
    };
}
