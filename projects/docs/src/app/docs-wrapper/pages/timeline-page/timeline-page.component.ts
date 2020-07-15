import { Component, OnInit } from "@angular/core";
import { TimelineListItem, TimelineDirection } from "@sebgroup/ng-components/timeline";

@Component({
    selector: "app-timeline-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-timeline [list]="list" [direction]="direction" (onClick)="onClick($event)"></sebng-timeline>
            </ng-container>
            <div class="row" controls>
                <label class="m-3 col-12">
                    direction
                    <p><small>define direction of timeline</small></p>
                    <select class="custom-select" [(ngModel)]="direction">
                        <option *ngFor="let item of directionList" [value]="item.value">{{ item.label }}</option>
                    </select>
                </label>
                <sebng-notification
                    [toggle]="toggle"
                    title="Timeline event is clicked"
                    [message]="message"
                    [dismissable]="true"
                    [dismissTimeout]="2000"
                    (onDismiss)="toggle = false"
                ></sebng-notification>
            </div>
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
    directionList: Array<DocDropdownItem<TimelineDirection>> = [
        { value: "vertical", label: "vertical" },
        { value: "horizontal", label: "horizontal" },
    ];
    direction: TimelineDirection = this.directionList[0].value;
    toggle: boolean = false;
    message: string = "";

    constructor() {
        document.title = "Timeline - SEB Angular Components";
    }

    ngOnInit(): void {}

    onClick(index: number): void {
        this.toggle = true;
        this.message = JSON.stringify(this.list[index]);
    }
}
