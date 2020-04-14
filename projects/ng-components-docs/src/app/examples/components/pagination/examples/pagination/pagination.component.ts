import { Component } from "@angular/core";

@Component({
    selector: "app-pagination",
    templateUrl: "./pagination.component.html",
})
export class PaginationComponent {
    constructor() {
        this.setPagination = this.setPagination.bind(this);
    }

    private _pagination: number = 0;
    get pagination(): number {
        return this._pagination;
    }

    set pagination(value: number) {
        this._pagination = value;
    }

    setPagination(value: number) {
        this.pagination = value;
    }
}
