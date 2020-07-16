import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-chip-page",
    template: `
        <app-doc-page [importString]="importString">
            <div class="d-flex flex-columns flex-wrap" example>
                <sebng-chip *ngFor="let item of array; let i = index" class="mr-2 mb-2" (onClose)="remove(i)"
                    >Chip label {{ item }}</sebng-chip
                >
            </div>
            <div controls>
                <button [disabled]="array.length === maxItems" class="btn btn-primary" (click)="add()">Add chip</button>
            </div>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class ChipPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/chip/chip.component");
    maxItems: number = 20;
    array: number[] = [1, 2, 3, 4, 5];
    snippet: string = `<sebng-chip>Chip label</sebng-chip>`;

    constructor() {
        document.title = "Chip - SEB Angular Components";
    }

    remove(index: number): void {
        if (this.array.length) {
            this.array = [...this.array.slice(0, index), ...this.array.slice(index + 1, this.array.length)];
        }
    }

    add(): void {
        if (this.array.length > 0 && this.array.length <= this.maxItems) {
            this.array = [...this.array, this.array[this.array.length - 1] + 1];
        } else if (this.array.length === 0) {
            this.array = [1];
        }
    }
}
