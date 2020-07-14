import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-timer-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-timer duration="90000"></sebng-timer>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class TimerPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/timer/timer.component");
    snippet: string = `<sebng-timer duration="90000"></sebng-timer>`;

    constructor() {
        document.title = "Timer - SEB Angular Components";
    }

    ngOnInit(): void {}
}
