import { Component, Input, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import { TableHeaderListItem, TableRowClickedEvent, SortInfo } from "./table.models";

/** A table displays collections of raw data grouped into rows with supporting headers. */
@Component({
    selector: "sebng-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
    /** List of table headers */
    @Input() headerList: Array<TableHeaderListItem> = [];
    /** The information on the currently selected sort: column name, type and asc/desc  */
    @Input() sortInfo?: SortInfo;
    /** Property sets whether rows of table are allowed to select */
    @Input() selectable?: boolean = false;
    /** Property sets whether all rows of table are selected by default */
    @Input() isAllSelected?: boolean = false;
    /** Date format for cell value with Date datatype */
    @Input() dateFormat: string = "yyyy-MM-dd";
    /** List of data */
    @Input() rows: Array<any> = [];
    /** The visible height of table */
    @Input() fixedHeight?: string;
    /** List of selected rows */
    @Input() selectedRowIndexes: number[] = [];

    /** Callback when a row is clicked */
    @Output() rowClicked: EventEmitter<TableRowClickedEvent> = new EventEmitter();
    /** Callback when sort button is clicked */
    @Output() sortClicked: EventEmitter<string> = new EventEmitter();
    /** Callback when select all checkbox is clicked */
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
