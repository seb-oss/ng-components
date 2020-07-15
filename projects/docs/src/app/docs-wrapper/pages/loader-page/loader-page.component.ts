import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-loader-page",
    templateUrl: "./loader-page.component.html",
})
export class LoaderPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/loader/loader.component");
    snippet: string = `<sebng-loader></sebng-loader>`;
    toggle: boolean = true;

    constructor() {
        document.title = "Loader - SEB Angular Components";
    }

    ngOnInit(): void {}
}
