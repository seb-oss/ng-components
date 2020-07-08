import { Component, OnInit, OnDestroy } from "@angular/core";
import { TableHeaderListItem, SortInfo, TableConfig, TableRowClickedEvent } from "lib/src/table/table.models";
import { TableService, TableComponent } from "lib/src/table";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { DropdownItem } from "lib/src/dropdown";

interface TableObjectType {
    rowNo: number;
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
    columnsList: DropdownItem[] = [
        { key: "foo", value: "foo", label: "Foo" },
        { key: "bar", value: "bar", label: "Bar" },
        { key: "amount", value: "amount", label: "Amount" },
        { key: "validFrom", value: "validFrom", label: "Valid From" },
        { key: "customTemplate", value: "customTemplate", label: "Custom Template" },
    ];
    columns: TableConfig<TableObjectType>["columns"];
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
        // Register your data with the table service.
        // (Optional): Pass in your config. The service will return
        // the headerList and rows to be displayed with the Table component.
        this.tableService.registerDatasource(this.data, {
            types: this.types,
            labels: this.customLabels,
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

    onChangeColumnsList = (list: DropdownItem[]) => {
        this.changeColumns([...list.map((item: DropdownItem) => item.value)]);
    };

    changeColumns(columns: TableConfig<TableObjectType>["columns"]) {
        this.columns = columns;
        this.tableService.registerDatasource(this.data, {
            types: this.types,
            labels: this.customLabels,
            columns,
        });
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
