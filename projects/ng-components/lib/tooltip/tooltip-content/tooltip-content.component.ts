import { Component, ViewEncapsulation, ElementRef, Input, TemplateRef, ViewChild, AfterViewInit, NgZone, OnDestroy } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export type TooltipTrigger = "hover" | "click" | "focus";
export type TooltipPosition =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "left-top"
    | "left-bottom"
    | "right-top"
    | "right-bottom";
export type TooltipTheme = "default" | "light" | "primary" | "warning" | "success" | "danger" | "purple";

@Component({
    selector: "sebng-tooltip-content",
    templateUrl: "./tooltip-content.component.html",
    styleUrls: ["./tooltip-content.component.scss"],
    animations: [
        trigger("fadeOut", [
            transition(":enter", [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
            transition(":leave", [animate(300, style({ opacity: 0 }))]),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
})
export class TooltipContentComponent implements AfterViewInit, OnDestroy {
    @Input() tooltipReference: ElementRef<HTMLDivElement>;
    @Input() theme: TooltipTheme = "default";
    @Input() className?: string = "";
    @Input() arrowClass: BehaviorSubject<string> = new BehaviorSubject("");

    @ViewChild("tooltip") tooltip: ElementRef<HTMLDivElement>;

    public isTemplateRef: boolean = false;
    public _content: string | TemplateRef<any> = "";

    arrowClassName: string = "";
    destroy$: Subject<boolean> = new Subject();

    constructor(private ngZone: NgZone) {}

    get content(): string | TemplateRef<any> {
        return this._content;
    }

    @Input("content") set content(value: string | TemplateRef<any>) {
        this._content = value;
        this.isTemplateRef = value instanceof TemplateRef;
    }

    ngAfterViewInit(): void {
        this.arrowClass.pipe(takeUntil(this.destroy$)).subscribe((res: string) => {
            this.ngZone.run(() => (this.arrowClassName = res));
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}
