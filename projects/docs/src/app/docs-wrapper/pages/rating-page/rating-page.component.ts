import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-rating-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-rating></sebng-rating>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class RatingPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/rating/rating.component");
    snippet: string = `<sebng-rating></sebng-rating>`;

    constructor() {
        document.title = "Rating - SEB Angular Components";
    }

    ngOnInit(): void {}
}
