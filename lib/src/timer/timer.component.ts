import { Component, Input, ViewEncapsulation, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { timer, Observable } from "rxjs";
import { map, takeWhile, finalize } from "rxjs/operators";

@Component({
    selector: "sebng-timer",
    templateUrl: "./timer.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class TimerComponent {
    @Input() id?: string;
    @Input() className?: string;
    @Output() onTimerEnd = new EventEmitter<void>();

    public timer: Observable<string>;

    private _duration: number;

    @Input()
    get duration() {
        return this._duration;
    }

    set duration(value: number) {
        this._duration = value;
        if (value !== null && value !== undefined) {
            this.setTimerValue();
        }
    }

    constructor(private changeRef: ChangeDetectorRef) {}

    setTimerValue(): void {
        this.timer = timer(0, 1000).pipe(
            map(i => this.duration / 1000 - i),
            takeWhile(i => i >= 0),
            map((n: number) => {
                const date: Date = new Date(n * 1000);
                return (
                    (date.getUTCHours() > 0 ? date.getUTCHours() + ":" : "") +
                    (date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes()) +
                    ":" +
                    (date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds())
                );
            }),
            finalize(() => this.onTimerEnd && this.onTimerEnd.emit())
        );
    }

    ngAfterContentChecked() {
        this.changeRef.detectChanges();
    }
}
