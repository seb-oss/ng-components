import { Component, Input } from "@angular/core";
import { TableRowClickedEvent, TableHeaderListItem } from "../table.models";

@Component({
    selector: "[app-table-body]",
    templateUrl: "./table-body.component.html"
})
export class TableBodyComponent {
    @Input() headerList: Array<TableHeaderListItem> = [];
    @Input() rows: Array<any> = [];
    @Input() rowClickedAction: (value: TableRowClickedEvent) => void;

    // ------------- CONSTRUCTOR ------------
    constructor() {
    }

    // ------------- EVENTS ------------------
    /**
     * handles the logic for when a row is clicked
     * @param {TableRowClickedEvent} value the TableRowClickedEvent
     */
    handleClickRow = (value: TableRowClickedEvent): void => {
        this.rowClickedAction && this.rowClickedAction(value);
    }
}
