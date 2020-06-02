import { Component, Input, EventEmitter, Output } from "@angular/core";
import { TableHeaderListItem, TableRowClickedEvent } from "../table.models";

@Component({
    selector: "[seb-table-body]",
    templateUrl: "./table-body.component.html",
})
export class TableBodyComponent {
    @Input() headerList: Array<TableHeaderListItem> = [];
    @Input() rows: Array<any> = [];
    @Input() selectable?: boolean = false;
    @Input() selectedRows: number[];
    @Output() rowClicked: EventEmitter<TableRowClickedEvent> = new EventEmitter();

    // ------------- EVENTS ------------------
    /**
     * handles the logic for when a row is clicked
     * @param {TableRowClickedEvent} value the TableRowClickedEvent
     */
    handleClickRow = (value: TableRowClickedEvent): void => {
        this.rowClicked.emit(value);
    };
}
