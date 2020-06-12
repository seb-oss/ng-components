import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TableHeaderListItem, SortInfo } from "../table.models";

@Component({
    selector: "[seb-table-header]",
    templateUrl: "./table-header.component.html",
})
export class TableHeaderComponent {
    @Input() list: Array<TableHeaderListItem> = [];
    @Input() sortInfo?: SortInfo;
    @Input() selectable?: boolean = false;
    @Input() isAllSelected?: boolean = false;
    @Output() sortClicked: EventEmitter<string> = new EventEmitter();
    @Output() allSelectedClicked: EventEmitter<void> = new EventEmitter();

    // ------------- EVENTS ------------------
    /**
     * handles the logic for when a header column is clicked
     * @param {SortInfo} value the SortInfo
     */
    handleClickSort = (value: string): void => {
        this.sortClicked.emit(value);
    };
}
