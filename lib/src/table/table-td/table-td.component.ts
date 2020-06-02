import { Component, Input } from "@angular/core";
import { TableHeaderListValueType } from "../table.models";

@Component({
    selector: "[seb-table-td]",
    templateUrl: "./table-td.component.html",
})
export class TableTDComponent {
    @Input() row: {};
    @Input() valueType: TableHeaderListValueType;
}
