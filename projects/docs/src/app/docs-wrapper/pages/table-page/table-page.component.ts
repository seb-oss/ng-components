import { Component } from "@angular/core";
import { TableService, TableConfig, TableTHeadTheme } from "@sebgroup/ng-components/table";
import { DropdownItem } from "@sebgroup/ng-components/dropdown";
import { simpleTableHTML, tableServiceExampleSnippet, tableServiceSortSnippet, rawDataNotesExample } from "./notes-snippets";

interface TablePageData {
    country: string;
    currency?: string;
    language?: string;
}

@Component({
    selector: "app-table-page",
    templateUrl: "./table-page.component.html",
    providers: [TableService],
})
export class TablePageComponent {
    itemsPerPage: number = 4;
    // controls
    compact: boolean = true;
    striped: boolean = false;
    dark: boolean = false;
    selectable: boolean = false;
    usePagination: boolean = false;
    hasFixedHeight: boolean = false;
    height: number = 130;

    importString: string = require("!raw-loader!@sebgroup/ng-components/table/table.component");
    snippet = (sortInfo: string, fixedHeight: boolean, height: number, dark: boolean, compact: boolean, striped: boolean): string => {
        return `
constructor(public tableService: TableService<any>) {
    this.tableService.registerDatasource(this.data, { sort: ${JSON.stringify(sortInfo).replace(/"/g, "'")} });
}

<sebng-table
    [darkTable]="${dark}"
    [compact]="${compact}"
    [striped]="${striped}"
    [rows]="tableService.currentTable | async"
    [headerList]="tableService.tableHeaderList | async"
    [sortInfo]="tableService.currentSortInfo | async"
    ${fixedHeight ? `[fixedHeight]="${height} + 'px'"}` : ""}
    (sortClicked)="tableService.handleChangeSort($event)"
    (rowClicked)="tableService.handleSelectRow($event.index)"
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
        { country: "Slovenia", currency: "EUR", language: "Slovenian" },
        { country: "Iraq", currency: "IQD" },
        { country: "Nigeria", language: "English" },
        { country: "Iceland", currency: "ISK" },
        { country: "Lithuania", currency: "EUR", language: "Lithuanian" },
        { country: "Spain", language: "Spanish" },
        { country: "United Kingdom", currency: "GBP" },
        { country: "China", currency: "CNY", language: "Mandarin" },
        { country: "India", currency: "INR", language: "Hindi" },
    ];
    columns: TableConfig<TablePageData>["columns"] = ["country", "currency", "language"];
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

    constructor(public tableService: TableService<TablePageData>) {
        document.title = "Table - SEB Angular Components";

        this.tableService.registerDatasource(this.data);
    }

    handleChangeUsePagination(newValue: boolean) {
        this.usePagination = newValue;
        if (newValue) {
            this.tableService.registerDatasource(this.data, {
                pagination: { maxItems: this.itemsPerPage },
                columns: this.getColumnsFromDropdownList(this.selectedColumnsDropdownList),
            });
        } else {
            this.tableService.registerDatasource(this.data, { columns: this.getColumnsFromDropdownList(this.selectedColumnsDropdownList) });
        }
    }

    getDropdownItemByColumnName = (col: string) => {
        return this.sortDropdownList.find(e => e.value === col);
    };

    getColumnsFromDropdownList = (list: DropdownItem<keyof TablePageData>[]): (keyof TablePageData)[] => {
        return list.map(e => e.value);
    };
}
