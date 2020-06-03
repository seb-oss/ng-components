import { Component, OnInit } from "@angular/core";
import { TableHeaderListItem } from "lib/src/table/table.models";
import { TableService } from "lib/src/table";

interface TableObjectType {
    foo: string;
    bar: string;
}

@Component({
    selector: "seb-table-examples",
    templateUrl: "./table-examples.component.html",
})
export class TableExamplesComponent implements OnInit {
    sortable: boolean;
    selectable: boolean;

    headerList: TableHeaderListItem<TableObjectType>[];
    rows: TableObjectType[];

    data: TableObjectType[] = [
        { foo: "foo 1", bar: "bar 1" },
        { foo: "foo 2", bar: "bar 2" },
        { foo: "foo 3", bar: "bar 3" },
    ];

    constructor(private tableService: TableService<TableObjectType>) {}

    ngOnInit() {
        // Register your data with the table service.
        // (Optional): Pass in your config. The service will return
        // the headerList and rows to be displayed with the Table component.
        this.tableService.registerDatasource(this.data);

        // Subscribe to the current table and header list
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
    }
}
