import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: "app-progressBar",
    templateUrl: "./progressBar.component.html",
})
export class ProgressBarComponent implements OnInit, OnDestroy {
    timerRef: NodeJS.Timeout;
    progress: number;

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
