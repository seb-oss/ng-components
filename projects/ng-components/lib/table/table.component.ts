import { Component, Input, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import { TableHeaderListItem, TableRowClickedEvent, SortInfo } from "./table.models";

@Component({
    selector: "seb-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
    @Input() headerList: Array<TableHeaderListItem> = [];
    @Input() sortInfo?: SortInfo;
    @Input() selectable?: boolean = false;
    @Input() isAllSelected?: boolean = false;
    @Input() dateFormat: string = "yyyy-MM-dd";
    @Input() rows: Array<any> = [];
    @Input() fixedHeight?: string;
    @Input() selectedRowIndexes: number[] = [];

    @Output() rowClicked: EventEmitter<TableRowClickedEvent> = new EventEmitter();
    @Output() sortClicked: EventEmitter<string> = new EventEmitter();
    @Output() selectAllClicked: EventEmitter<void> = new EventEmitter();

    // ------------- EVENTS ------------------
    /**
     * handles the logic for when a row is clicked
     * @param {TableRowClickedEvent} value the TableRowClickedEvent
     */
    handleClickRow = (value: TableRowClickedEvent): void => {
        this.rowClicked.emit(value);
    };

    /**
     * handles the logic for when the checkbox in the header is selected
     */
    handleAllSelectedClicked(): void {
        this.selectAllClicked.emit();
    }
}
