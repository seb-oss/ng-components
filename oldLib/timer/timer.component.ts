import { Component, Input, OnInit, ViewEncapsulation, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: "ac-timer",
    templateUrl: "./timer.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges {
    @Input() duration: number;
    @Input() callback?: () => void;
    @Input() className?: string;

    timer: string;
    innerInterval: any;

    ngOnInit() {
        if (this.duration !== null && this.duration !== undefined) {
            this.startInterval(this.duration);
        }
    }

    ngOnDestroy() {
        this.clearInterval();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.duration) {
            if (changes.duration.currentValue !== changes.duration.previousValue) {
                this.startInterval(changes.duration.currentValue);
            }
        }
    }

    startInterval(timeout: number): void {
        this.timer = this.convertMStoTime(timeout);
        this.clearInterval();
        this.innerInterval = setInterval(() => {
            if (timeout > 0) {
                timeout = timeout - 1000;
                this.timer = this.convertMStoTime(timeout);
                if (timeout === 0) {
                    this.callback();
                    this.clearInterval();
                }
            }
        }, 1000);
    }

    clearInterval(): void {
        if (this.innerInterval) {
            clearTimeout(this.innerInterval);
            this.innerInterval = null;
        }
    }

    convertMStoTime(value: number): string {
        const date: Date = new Date(value);
        return (
            ((date.getUTCHours() > 0) ? (date.getUTCHours() + ":") : "")
            + (date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes()))
            + ":"
            + (date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds()
            );
    }
}
