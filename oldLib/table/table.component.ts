import { Component, ViewEncapsulation, Input } from "@angular/core";
import { TableHeaderListItem, TableRowClickedEvent, SortInfo } from "./table.models";

@Component({
    selector: "ac-table",
    styleUrls: ["./table.component.scss"],
    templateUrl: "./table.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TableComponent {
    @Input() headerList: Array<TableHeaderListItem> = [];
    @Input() rows: Array<any> = [];
    @Input() fixedHeight?: string;
    @Input() className?: string;
    @Input() rowClickedAction: (value: TableRowClickedEvent) => void;
    @Input() sortClickedAction: (value: SortInfo) => void;

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

    /**
     * handles the logic for when a header column is clicked
     * @param {SortInfo} value the SortInfo
     */
    handleClickSort = (value: SortInfo): void => {
      this.sortClickedAction && this.sortClickedAction(value);
    }
}
