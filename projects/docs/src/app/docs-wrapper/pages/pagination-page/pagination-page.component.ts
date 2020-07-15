import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-pagination-page",
    templateUrl: "./pagination-page.component.html",
})
export class PaginationPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/pagination/pagination.component");
    pagination: number = 2;
    snippet: string = `<sebng-pagination [value]="pagination" [size]="size" [offset]="offset" [pagingLength]="paginLength"></sebng-pagination>`;

    constructor() {
        document.title = "Pagination - SEB Angular Components";
    }

    ngOnInit(): void {}
}
