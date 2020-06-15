import { Component, OnInit, OnDestroy } from "@angular/core";
import { TableHeaderListItem, SortInfo, TableConfig } from "lib/src/table/table.models";
import { TableService } from "lib/src/table";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

interface TableObjectType {
    foo: string;
    bar: string;
    amount: string;
    validFrom?: string | Date;
    customTemplate?: string;
}

@Component({
    selector: "seb-table-examples",
    templateUrl: "./table-examples.component.html",
})
export class TableExamplesComponent implements OnInit, OnDestroy {
    sortInfo: SortInfo<keyof TableObjectType>;
    curentPage: number = 0;
    maxItemsPerPage: number = 3;
    types: TableConfig<TableObjectType>["types"] = { amount: "number", validFrom: "date", customTemplate: "custom-html" };
    unsubscribe: Subject<any> = new Subject();

    headerList: TableHeaderListItem<TableObjectType>[];
    rows: TableObjectType[];

    data: TableObjectType[] = [
        { foo: "C", bar: "bar 1", amount: "00034", validFrom: new Date() },
        { foo: "A", bar: "bar 2", amount: "278392", validFrom: new Date().toString() },
        {
            foo: "B",
            bar: "bar 3",
            amount: "5530",
            validFrom: "2020 01 05",
            customTemplate: "<code>Custom html</code>",
        },
        { foo: "E", bar: "bar 5", amount: "11" },
        { foo: "D", bar: "bar 4", amount: "0.5" },
    ];

    constructor(private tableService: TableService<TableObjectType>) {}

    ngOnInit(): void {
        // Register your data with the table service.
        // (Optional): Pass in your config. The service will return
        // the headerList and rows to be displayed with the Table component.
        this.tableService.registerDatasource(this.data, {
            types: this.types,
            sort: { column: "amount", isAscending: true, type: this.types.amount }, // Initial SORT info
            pagination: {
                maxItems: this.maxItemsPerPage,
            },
        });

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
    }

    handleSortClicked(selectedColumn: keyof TableObjectType): void {
        this.tableService.handleChangeSort(selectedColumn);
        this.handleChangePagination(1);
    }

    handleChangePagination(newIndex: number): void {
        this.tableService.handleChangePagination(newIndex);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
    }
}
