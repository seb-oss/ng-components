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
    @Input() sortable?: boolean = false;
    @Input() selectable?: boolean = false;
    @Input() rows: Array<any> = [];
    @Input() fixedHeight?: string;
    @Output() rowClicked: EventEmitter<TableRowClickedEvent> = new EventEmitter();
    @Output() sortClicked: EventEmitter<SortInfo> = new EventEmitter();
    @Output() selectedRows: EventEmitter<number[]> = new EventEmitter();

    _selectedRowIndexes: number[] = [];
    get selectedRowIndexes(): number[] {
        return this._selectedRowIndexes;
    }

    // ------------- EVENTS ------------------
    /**
     * handles the logic for when a row is clicked
     * @param {TableRowClickedEvent} value the TableRowClickedEvent
     */
    handleClickRow = (value: TableRowClickedEvent): void => {
        if (this.selectable) {
            const rowIsSelected: boolean = this._selectedRowIndexes.includes(value.index);
            if (rowIsSelected) {
                this._selectedRowIndexes = [...this._selectedRowIndexes.filter(val => val !== value.index)];
            } else {
                this._selectedRowIndexes = [...this._selectedRowIndexes];
                this._selectedRowIndexes.push(value.index);
            }
        }
        this.selectedRows.emit(this._selectedRowIndexes);
        this.rowClicked.emit(value);
    };

    /**
     * handles the logic for when the checkbox in the header is selected
     */
    handleAllSelectedClicked(): void {
        if (this.rows.length && this._selectedRowIndexes.length < this.rows.length) {
            this._selectedRowIndexes = [...this.rows.map((_, i) => i)];
        } else {
            this._selectedRowIndexes = [];
        }
        this.selectedRows.emit(this._selectedRowIndexes);
    }

    /**
     * handles the logic for when a header column is clicked
     * @param {SortInfo} value the SortInfo
     */
    handleClickSort = (value: SortInfo): void => {
        this.sortClicked.emit(value);
    };
}
