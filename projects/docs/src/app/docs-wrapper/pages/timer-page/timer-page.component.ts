import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-timer-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-timer [duration]="duration" (onTimerEnd)="isToggled = true"></sebng-timer>
            </ng-container>
            <div class="row" controls>
                <label class="m-3 col-12">
                    duration
                    <p><small>set duration of timer</small></p>
                    <input class="form-control" [(ngModel)]="duration" />
                </label>
                <sebng-notification
                    [toggle]="isToggled"
                    title="Time is up"
                    message="Timer ended"
                    [dismissable]="true"
                    [dismissTimeout]="2000"
                    (onDismiss)="isToggled = false"
                ></sebng-notification>
            </div>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class TimerPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/timer/timer.component");
    snippet: string = `<sebng-timer duration="90000"></sebng-timer>`;

    duration: number = 90000;
    isToggled: boolean = false;

    constructor() {
        document.title = "Timer - SEB Angular Components";
    }

    ngOnInit(): void {}
}
