import { Component, ViewEncapsulation, ElementRef, Input, TemplateRef, ViewChild, AfterViewInit, NgZone, OnDestroy } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TooltipPosition } from "../tooltip.positions";

export type TooltipTrigger = "hover" | "click" | "focus";

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
    @Input() positionClass?: BehaviorSubject<TooltipPosition> = new BehaviorSubject("top");
    @Input() className?: string = "";

    @ViewChild("tooltip") tooltip: ElementRef<HTMLDivElement>;

    public isTemplateRef: boolean = false;
    public _content: string | TemplateRef<any> = "";

    position: TooltipPosition = "top";
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
        this.positionClass.pipe(takeUntil(this.destroy$)).subscribe((res: TooltipPosition) => {
            this.ngZone.run(() => (this.position = res));
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}
