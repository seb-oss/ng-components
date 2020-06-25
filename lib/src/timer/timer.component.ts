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
import { timer, Observable } from "rxjs";
import { map, takeWhile, tap, finalize } from "rxjs/operators";

@Component({
    selector: "sebng-timer",
    templateUrl: "./timer.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class TimerComponent implements OnInit, OnChanges {
    @Input() id?: string;
    @Input() className?: string;
    @Output() callback = new EventEmitter<void>();
    @Input() duration: number;
    public timer: Observable<string>;

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
            finalize(() => this.callback && this.callback.emit())
        );
    }

    ngOnInit() {
        if (this.duration !== null && this.duration !== undefined) {
            this.setTimerValue();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.duration) {
            if (changes.duration.currentValue !== null && changes.duration.currentValue !== undefined) {
                this.setTimerValue();
            }
        }
    }

    ngAfterContentChecked() {
        this.changeRef.detectChanges();
    }
}
