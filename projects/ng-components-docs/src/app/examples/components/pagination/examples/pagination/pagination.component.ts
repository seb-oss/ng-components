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
    private _pagination2: number = 0;
    private _dotnav: number = 0;

    get pagination(): number {
        return this._pagination;
    }

    set pagination(value: number) {
        this._pagination = value;
    }

    get pagination2(): number {
        return this._pagination2;
    }

    set pagination2(value: number) {
        this._pagination2 = value;
    }

    get dotnav(): number {
        return this._dotnav;
    }

    set dotnav(value: number) {
        this._dotnav = value;
    }

    setPagination(value: number): void {
        this.pagination = value;
    }

    setPagination2(value: number): void {
        this.pagination2 = value;
    }

    setDotnav(value: number): void {
        this.dotnav = value;
    }
}
