import { Component, OnInit } from "@angular/core";
import { TableHeaderListItem, SortInfo, TableConfig } from "lib/src/table/table.models";
import { TableService } from "lib/src/table";

interface TableObjectType {
    foo: string;
    bar: string;
    amount: string;
    validFrom: string | Date;
}

@Component({
    selector: "seb-table-examples",
    templateUrl: "./table-examples.component.html",
})
export class TableExamplesComponent implements OnInit {
    sortInfo: SortInfo<keyof TableObjectType>;
    types: TableConfig<TableObjectType>["types"] = { amount: "number", validFrom: "date" };
    selectable: boolean;

    headerList: TableHeaderListItem<TableObjectType>[];
    rows: TableObjectType[];

    data: TableObjectType[] = [
        { foo: "C", bar: "bar 1", amount: "00034", validFrom: new Date() },
        { foo: "A", bar: "bar 2", amount: "278392", validFrom: new Date().toString() },
        { foo: "B", bar: "bar 3", amount: "5530", validFrom: "2020 01 05" },
    ];

    constructor(private tableService: TableService<TableObjectType>) {}

    ngOnInit() {
        // Register your data with the table service.
        // (Optional): Pass in your config. The service will return
        // the headerList and rows to be displayed with the Table component.
        this.tableService.registerDatasource(this.data, {
            types: this.types,
            sort: { column: "amount", isAscending: true, type: this.types.amount }, // Initial SORT info
        });

        // Subscribe to the current table, header list and sortInfo
        this.tableService.currentTable.subscribe({
            next: (value: TableObjectType[]) => {
                this.rows = [...value];
            },
        });

        this.tableService.tableHeaderList.subscribe({
            next: (value: TableHeaderListItem<TableObjectType>[]) => {
                this.headerList = [...value];
            },
        });

        this.tableService.currentSortInfo.subscribe({
            next: (value: SortInfo<keyof TableObjectType>) => {
                this.sortInfo = value;
            },
        });
    }

    handleSortClicked(selectedColumn: keyof TableObjectType) {
        this.tableService.handleChangeSort(selectedColumn);
    }
}
