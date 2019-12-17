import { Component, Input } from "@angular/core";
import { TableHeaderListItem, SortInfo } from "../table.models";

@Component({
  selector: "[app-table-header]",
  templateUrl: "./table-header.component.html"
})
export class TableHeaderComponent {
  @Input() list: Array<TableHeaderListItem> = [];
  @Input() isSticky: boolean = false;
  @Input() sortClickedAction: (value: SortInfo) => void;

  // ------------- CONSTRUCTOR ------------
  constructor() {
  }

  // ------------- EVENTS ------------------
  /**
   * handles the logic for when a header column is clicked
   * @param {SortInfo} value the SortInfo
   */
  handleClickSort = (value: SortInfo): void => {
    this.sortClickedAction && this.sortClickedAction(value);
  }
}
