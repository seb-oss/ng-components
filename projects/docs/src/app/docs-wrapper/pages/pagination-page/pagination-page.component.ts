import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-pagination-page",
    templateUrl: "./pagination-page.component.html",
})
export class PaginationPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/pagination/pagination.component");
    pagination: number = 2;
    snippet: string = `<sebng-pagination [value]="value" [size]="size" [offset]="offset" [pagingLength]="pagingLength"></sebng-pagination>`;

    // controls
    size: number = 20;
    value: number = 1;
    offset: number = 1;
    pagingLength: number = 3;
    firstText: string;
    lastText: string;
    nextText: string;
    previousText: string;
    useDotNav: boolean;
    useFirstAndLast: boolean;
    useTextNav: boolean;

    constructor() {
        document.title = "Pagination - SEB Angular Components";
    }

    ngOnInit(): void {}
}
