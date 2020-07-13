import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-pagination-page",
    templateUrl: "./pagination-page.component.html",
})
export class PaginationPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/pagination/pagination.component");
    pagination: number = 2;

    constructor() {
        document.title = "Pagination - SEB Angular Components";
    }

    ngOnInit(): void {}
}
