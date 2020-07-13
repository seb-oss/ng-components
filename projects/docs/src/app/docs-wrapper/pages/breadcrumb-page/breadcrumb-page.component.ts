import { Component, OnInit } from "@angular/core";
// import { BreadcrumbListItem, BreadcrumbProps } from "@sebgroup/ng-components/breadcrumb";

@Component({
    selector: "app-breadcrumb-page",
    templateUrl: "./breadcrumb-page.component.html",
})
export class BreadcrumbPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/breadcrumb/breadcrumb.component");
    breadcrumbList: Array<string> = ["Home", "Articles", "ng-components", "about"];

    constructor() {
        document.title = "Breadcrumb - SEB Angular Components";
    }

    ngOnInit(): void {}
}
