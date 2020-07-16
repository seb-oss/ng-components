import { Component } from "@angular/core";
import { TimelineListItem, TimelineDirection } from "@sebgroup/ng-components/timeline";

@Component({
    selector: "app-timeline-page",
    templateUrl: "./timeline-page.component.html",
})
export class TimelinePageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/timeline/timeline.component");
    snippet: string = `<sebng-timeline [list]="list"></sebng-timeline>`;

    list: Array<TimelineListItem> = [
        { time: "7 AM - 9 AM", title: "Breakfast" },
        { time: "12 PM", title: "Brunch" },
        { time: "1 PM - 4 PM", title: "Lunch" },
        { time: "6 PM - 9 PM", title: "Dinner" },
    ];
    directionList: Array<DocDropdownItem<TimelineDirection>> = [
        { value: "vertical", label: "vertical" },
        { value: "horizontal", label: "horizontal" },
    ];
    direction: TimelineDirection = this.directionList[0].value;

    constructor() {
        document.title = "Timeline - SEB Angular Components";
    }

    onClick(index: number): void {
        alert(JSON.stringify(this.list[index]));
    }
}
