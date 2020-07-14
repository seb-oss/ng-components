import { Component, OnInit } from "@angular/core";
import { TimelineListItem } from "@sebgroup/ng-components/timeline";

@Component({
    selector: "app-timeline-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-timeline [list]="list"></sebng-timeline>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class TimelinePageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/timeline/timeline.component");
    snippet: string = `<sebng-timeline [list]="list"></sebng-timeline>`;

    list: Array<TimelineListItem> = [
        { time: "7 AM - 9 AM", title: "Breakfast" },
        { time: "12 PM", title: "Brunch" },
        { time: "1 PM - 4 PM", title: "Lunch" },
        { time: "6 PM - 9 PM", title: "Dinner" },
    ];
    constructor() {
        document.title = "Timeline - SEB Angular Components";
    }

    ngOnInit(): void {}
}
