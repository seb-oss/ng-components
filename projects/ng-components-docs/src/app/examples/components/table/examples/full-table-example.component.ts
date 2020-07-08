import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { TableHeaderListItem, SortInfo, TableConfig, TableRowClickedEvent } from "lib/src/table/table.models";
import { TableService } from "lib/src/table";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

interface TableObjectType {
    rowNo: number;
    foo: string;
    bar: string;
    amount: string;
    validFrom?: string | Date;
    customTemplate?: string;
}

@Component({
    selector: "seb-full-table-example",
    templateUrl: "./full-table-example.component.html",
    providers: [TableService],
})
export class FullTableExampleComponent implements OnInit, OnDestroy {
    @Input("columns")
    set columns(value: TableConfig<TableObjectType>["columns"]) {
        // Register your data with the table service.
        // (Optional): Pass in your config. The service will return
        // the headerList and rows to be displayed with the Table component.
        this.tableService.registerDatasource(this.data, {
            types: this.types,
            labels: this.customLabels,
            sort: { column: "amount", isAscending: true, type: this.types.amount },
            pagination: {
                maxItems: this.maxItemsPerPage,
            },
            columns: value,
        });
    }
    sortInfo: SortInfo<keyof TableObjectType>;
    curentPage: number = 0;
    maxItemsPerPage: number = 3;
    types: TableConfig<TableObjectType>["types"] = { amount: "number", validFrom: "date", customTemplate: "custom-html", rowNo: "number" };
    customLabels: TableConfig<TableObjectType>["labels"] = { rowNo: "#" };
    unsubscribe: Subject<any> = new Subject();

    headerList: TableHeaderListItem<TableObjectType>[];
    rows: TableObjectType[];
    selectedRows: number[][] = [[]];
    isAllSelected: boolean = false;

    data: TableObjectType[] = [
        { rowNo: 1, foo: "C", bar: "bar 1", amount: "00034", validFrom: new Date() },
        { rowNo: 2, foo: "A", bar: "bar 2", amount: "278392", validFrom: new Date().toString() },
        {
            rowNo: 3,
            foo: "B",
            bar: "bar 3",
            amount: "5530",
            validFrom: "2020 01 05",
            customTemplate: "<code>Custom html</code>",
        },
        { rowNo: 4, foo: "E", bar: "bar 5", amount: "11" },
        { rowNo: 5, foo: "D", bar: "bar 4", amount: "0.5" },
    ];

    constructor(private tableService: TableService<TableObjectType>) {}

    ngOnInit(): void {
        // Subscribe to the current table, header list and sortInfo
        this.tableService.currentTable.pipe(takeUntil(this.unsubscribe)).subscribe({
            next: (value: TableObjectType[]) => {
                this.rows = [...value];
            },
        });

        this.tableService.tableHeaderList.pipe(takeUntil(this.unsubscribe)).subscribe({
            next: (value: TableHeaderListItem<TableObjectType>[]) => {
                this.headerList = [...value];
            },
        });

        this.tableService.currentSortInfo.pipe(takeUntil(this.unsubscribe)).subscribe({
            next: (value: SortInfo<keyof TableObjectType>) => {
                this.sortInfo = value;
            },
        });

        this.tableService.currentPageIndex.pipe(takeUntil(this.unsubscribe)).subscribe({
            next: (value: number) => {
                this.curentPage = value;
            },
        });

        this.tableService.selectedRows.pipe(takeUntil(this.unsubscribe)).subscribe({
            next: (value: number[][]) => {
                this.selectedRows = value;
            },
        });

        this.tableService.isAllSelected.pipe(takeUntil(this.unsubscribe)).subscribe({
            next: (value: boolean) => {
                this.isAllSelected = value;
            },
        });
    }

    handleSortClicked(selectedColumn: keyof TableObjectType): void {
        this.tableService.handleChangeSort(selectedColumn);
        this.handleChangePagination(1);
    }

    handleChangePagination(newIndex: number): void {
        this.tableService.handleChangePagination(newIndex);
    }

    handleSelectRow(event: TableRowClickedEvent): void {
        this.tableService.handleSelectRow(event.index);
    }

    handleSelectAll(): void {
        this.tableService.handleSelectAllRows();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
    }
}
