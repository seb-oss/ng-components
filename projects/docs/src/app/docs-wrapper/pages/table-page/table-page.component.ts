import { Component } from "@angular/core";
import { TableService, SortInfo, TableConfig, TableHeaderListItem } from "@sebgroup/ng-components/table";
import { BehaviorSubject } from "rxjs";
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
    selectable: boolean = false;
    usePagination: boolean = false;
    hasFixedHeight: boolean = false;
    height: number = 130;

    importString: string = require("!raw-loader!@sebgroup/ng-components/table/table.component");
    snippet = (selectable: boolean, isAllSelected: boolean, sortInfo: string, height: number): string => {
        return `
        this.tableService.registerDatasource(this.data);
        this.rows$ = this.tableService.currentTable;
        this.headerList$ = this.tableService.tableHeaderList;

        <sebng-table
            [rows]="rows$ | async"
            [headerList]="headerList$ | async"
            [selectable]="${selectable}"
            [selectedRowIndexes]="selectable ? (selectedRows$ | async)[pageIndex] : null"
            [isAllSelected]="${isAllSelected}"
            [sortInfo]="${JSON.stringify(sortInfo).replace(/"/g, "'")}"
            [fixedHeight]="${height} + 'px'"
            (sortClicked)="changeSort($event)"
            (selectAllClicked)="selectAll()"
            (rowClicked)="selectRow($event.index)"
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

    sortInfo$: BehaviorSubject<SortInfo<keyof TablePageData>>;
    rows$: BehaviorSubject<TablePageData[]>;
    headerList$: BehaviorSubject<TableHeaderListItem<TablePageData>[]>;
    selectedRows$: BehaviorSubject<number[][]>;
    isAllSelected$: BehaviorSubject<boolean>;
    pageIndex$: BehaviorSubject<number>;
    changeSort: TableService<TablePageData>["handleChangeSort"];
    changePage: TableService<TablePageData>["handleChangePagination"];
    changeColumns: TableService<TablePageData>["handleChangeColumns"];
    selectRow: TableService<TablePageData>["handleSelectRow"];
    selectAll: TableService<TablePageData>["handleSelectAllRows"];

    constructor(private tableService: TableService<TablePageData>) {
        document.title = "Table - SEB Angular Components";

        this.tableService.registerDatasource(this.data);
        this.rows$ = this.tableService.currentTable;
        this.headerList$ = this.tableService.tableHeaderList;
        this.sortInfo$ = this.tableService.currentSortInfo;
        this.selectedRows$ = this.tableService.selectedRows;
        this.isAllSelected$ = this.tableService.isAllSelected;
        this.pageIndex$ = this.tableService.currentPageIndex;
        this.changeSort = this.tableService.handleChangeSort;
        this.changePage = this.tableService.handleChangePagination;
        this.changeColumns = this.tableService.handleChangeColumns;
        this.selectRow = this.tableService.handleSelectRow;
        this.selectAll = this.tableService.handleSelectAllRows;
    }

    handleChnageUsePagination(newValue: boolean) {
        this.usePagination = newValue;
        if (newValue) {
            this.tableService.registerDatasource(this.data, { pagination: { maxItems: this.itemsPerPage } });
        } else {
            this.tableService.registerDatasource(this.data);
        }
    }

    getDropdownItemByColumnName = (col: string) => {
        return this.sortDropdownList.find(e => e.value === col);
    };

    getColumnsFromDropdownList = (list: DropdownItem<keyof TablePageData>[]): (keyof TablePageData)[] => {
        return list.map(e => e.value);
    };
}
