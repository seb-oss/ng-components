import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TableHeaderListItem, SortInfo } from "../table.models";

@Component({
    selector: "[seb-table-header]",
    templateUrl: "./table-header.component.html",
})
export class TableHeaderComponent {
    @Input() list: Array<TableHeaderListItem> = [];
    @Input() isSticky: boolean = false;
    @Input() sortable?: boolean = true;
    @Input() selectable?: boolean = false;
    @Input() isAllSelected?: boolean = false;
    @Output() sortClicked: EventEmitter<SortInfo> = new EventEmitter();
    @Output() allSelectedClicked: EventEmitter<void> = new EventEmitter();

    // ------------- EVENTS ------------------
    /**
     * handles the logic for when a header column is clicked
     * @param {SortInfo} value the SortInfo
     */
    handleClickSort = (value: SortInfo): void => {
        this.sortClicked.emit(value);
    };
}
