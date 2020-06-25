import {
    Component,
    Input,
    ViewEncapsulation,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef,
} from "@angular/core";

@Component({
    selector: "sebng-timer",
    templateUrl: "./timer.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class TimerComponent implements OnInit, OnChanges, OnDestroy {
    @Input() id?: string;
    @Input() className?: string;
    @Output() callback = new EventEmitter<KeyboardEvent>();
    @Input() duration: number;
    public timer: string;
    private innerInterval: NodeJS.Timeout;

    constructor(private changeRef: ChangeDetectorRef) {}

    setTimerValue(timeout: number, callback: Function): void {
        this.timer = this.convertMStoTime(timeout);
        return callback();
    }

    startInterval(timeout: number): void {
        this.setTimerValue(timeout, () => {
            this.clearInterval();
            this.innerInterval = setInterval(() => {
                if (timeout > 0) {
                    timeout = timeout - 1000;
                    this.setTimerValue(timeout, () => {
                        if (timeout === 0) {
                            this.callback.emit();
                            this.clearInterval();
                        }
                    });
                }
            }, 1000);
        });
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
            (date.getUTCHours() > 0 ? date.getUTCHours() + ":" : "") +
            (date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes()) +
            ":" +
            (date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds())
        );
    }

    ngOnInit() {
        this.timer = "00:00";
        if (this.duration !== null && this.duration !== undefined) {
            this.startInterval(this.duration);
        }
    }

    ngOnDestroy() {
        this.clearInterval();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.duration) {
            if (changes.duration.currentValue !== null && changes.duration.currentValue !== undefined) {
                this.startInterval(this.duration);
            }
        }
    }

    ngAfterContentChecked() {
        this.changeRef.detectChanges();
    }
}
