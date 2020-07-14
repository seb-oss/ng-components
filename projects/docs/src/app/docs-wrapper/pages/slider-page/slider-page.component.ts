import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-slider-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-slider></sebng-slider>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class SliderPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/slider/slider.component");
    snippet: string = `<sebng-slider></sebng-slider>`;

    constructor() {
        document.title = "Slider - SEB Angular Components";
    }

    ngOnInit(): void {}
}
