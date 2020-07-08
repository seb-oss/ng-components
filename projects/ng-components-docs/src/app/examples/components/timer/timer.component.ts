import { Component } from "@angular/core";

@Component({
    templateUrl: "./timer.component.html",
})
export class TimerComponent {
    callBack() {
        console.log("TIMER ENDED callback");
    }
}
