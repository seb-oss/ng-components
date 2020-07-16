import { Component, Input, ViewEncapsulation, Output, EventEmitter, OnDestroy } from "@angular/core";

/** A timer is a component for measuring time intervals */
@Component({
    selector: "sebng-timer",
    templateUrl: "./timer.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class TimerComponent implements OnDestroy {
    /** Element ID */
    @Input() id?: string;
    /** Element class name */
    @Input() className?: string;
    /** Timer's duration in seconds */
    @Input() get duration(): number {
        return this._duration;
    }

    set duration(value: number) {
        this.clearTimer();
        if (value !== null && value !== undefined) {
            this._duration = value;
            this._countDown = value;
            this.startTimer();
        }
    }

    /** Callback when timer ends */
    @Output() timerEnd: EventEmitter<void> = new EventEmitter<void>();

    public minutes: number = 0;
    public seconds: number = 0;

    private _timer: { current: any } = { current: null };
    private _duration: number = 0;
    private _countDown: number = 0;

    /** Clears the timer */
    private clearTimer(): void {
        this._countDown = 0;
        this._timer.current && clearInterval(this._timer.current);
    }

    /**
     * Converts the numeric value into two digits string for display purposes
     * @param {number} value The numberic value to be converted
     * @returns The two digits string value
     */
    toDoubleDigits(value: number): string {
        return value < 10 ? `0${value}` : String(value);
    }

    /** Kicks off the timer */
    startTimer(): void {
        this._timer.current = setInterval(() => {
            if (this._countDown--) {
                this.minutes = Math.floor(this._countDown / 60);
                this.seconds = this._countDown < 60 ? this._countDown : this._countDown % 60;
            } else {
                this.clearTimer();
                this.timerEnd.emit();
            }
        }, 1000);
    }

    ngOnDestroy(): void {
        this.clearTimer();
    }
}
