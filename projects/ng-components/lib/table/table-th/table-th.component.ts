import { Component, Input } from "@angular/core";

@Component({
    selector: "[seb-table-th]",
    template: `<span>{{ label }}</span>`,
})
export class TableTHComponent {
    @Input() label: string;
}
