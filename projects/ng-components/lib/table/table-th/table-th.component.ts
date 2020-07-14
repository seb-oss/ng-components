import { Component, Input } from "@angular/core";

@Component({
    selector: "[seb-table-th]",
    templateUrl: "./table-th.component.html",
})
export class TableTHComponent {
    @Input() label: string;
}
