import { Component } from "@angular/core";
import { TableHeaderListItem } from "lib/src/table/table.models";

interface TableObjectType {
    foo: string;
    bar: string;
}

@Component({
    selector: "seb-table-examples",
    templateUrl: "./table-examples.component.html",
})
export class TableExamplesComponent {
    headerList: TableHeaderListItem<TableObjectType>[] = [
        { tableKeySelector: "foo", label: "Foo label", active: false, asc: false, valueType: "string" },
        { tableKeySelector: "bar", label: "Bar label", active: false, asc: false, valueType: "string" },
    ];

    rows: TableObjectType[] = [
        { foo: "foo 1", bar: "bar 1" },
        { foo: "foo 2", bar: "bar 2" },
        { foo: "foo 3", bar: "bar 3" },
    ];
}
