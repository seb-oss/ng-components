import { Component, OnInit, OnDestroy } from "@angular/core";
import { BarItem } from "lib/src/progressBar";

@Component({
    selector: "app-progressBar",
    templateUrl: "./progressBar.component.html",
})
export class ProgressBarComponent implements OnInit, OnDestroy {
    timerRef: NodeJS.Timeout;
    progress: number;
    bars: Array<BarItem> = [
        { value: 20, theme: "success" },
        { value: 30, theme: "danger", striped: true },
        { value: 30, theme: "info", striped: true, animated: true },
        { value: 20, theme: "warning", showProgress: true },
    ];

    simulateProgress(): void {
        if (this.timerRef) {
            clearInterval(this.timerRef);
        }
        this.progress = 0;
        this.timerRef = setInterval((): void => {
            if (this.progress < 100) {
                this.progress += 1;
            } else {
                clearInterval(this.timerRef);
            }
        }, 100);
    }

    ngOnInit() {
        this.simulateProgress();
    }

    ngOnDestroy() {
        if (this.timerRef) {
            clearInterval(this.timerRef);
        }
    }
}
