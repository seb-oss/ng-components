import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-rating-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-rating
                    [(ngModel)]="value"
                    [iconWidth]="iconWidth"
                    [iconHeight]="iconHeight"
                    [max]="max"
                    [readOnly]="readOnly"
                    [useHollow]="useHollow"
                    [showValue]="showValue"
                    [showTextValue]="showTextValue"
                ></sebng-rating>
            </ng-container>
            <ng-container controls>
                <label>Value</label>
                <sebng-stepper [(ngModel)]="value" min="0"></sebng-stepper>

                <label>Max</label>
                <small>The maximum amount of stars to display</small>
                <sebng-stepper [(ngModel)]="max" min="0"></sebng-stepper>

                <sebng-checkbox
                    label="Read-only"
                    description="The component will only display the value and is not interactive."
                    [(ngModel)]="readOnly"
                ></sebng-checkbox>

                <sebng-checkbox
                    label="Use hollow"
                    description="Show unselected stars outlined or hollow."
                    [(ngModel)]="useHollow"
                ></sebng-checkbox>

                <sebng-checkbox
                    label="Show value"
                    description="Display the numeric value of the selected rating."
                    [(ngModel)]="showValue"
                ></sebng-checkbox>
            </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class RatingPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/rating/rating.component");
    snippet: string = `<sebng-rating></sebng-rating>`;

    // constrols
    value: number = 3;
    iconWidth: number = 30;
    iconHeight: number = 30;
    max: number = 5;
    readOnly: boolean;
    useHollow: boolean;
    showValue: boolean;
    showTextValue: boolean;
    // tooltipList: Array<string> = [];
    // colors: Array<string> = [];

    constructor() {
        document.title = "Rating - SEB Angular Components";
    }

    ngOnInit(): void {}
}
