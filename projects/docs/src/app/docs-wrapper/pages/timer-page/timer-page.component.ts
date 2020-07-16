import { Component } from "@angular/core";

@Component({
    selector: "app-timer-page",
    templateUrl: "./timer-page.component.html",
})
export class TimerPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/timer/timer.component");
    snippet: string = `<sebng-timer duration="90000"></sebng-timer>`;

    duration: number = 90;
    isToggled: boolean = false;

    constructor() {
        document.title = "Timer - SEB Angular Components";
    }
}
