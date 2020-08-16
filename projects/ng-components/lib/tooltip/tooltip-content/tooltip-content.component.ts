import {
    Component,
    ViewEncapsulation,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild,
    Output,
    EventEmitter,
    OnInit,
    AfterViewInit,
    NgZone,
    OnDestroy,
} from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { Observable, BehaviorSubject } from "rxjs";

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
    @Input() position: TooltipPosition = "top";
    @Input() theme: TooltipTheme = "default";
    @Input() className?: string = "";
    @Input() arrowClass: BehaviorSubject<string> = new BehaviorSubject("");

    @Output() defocus: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild("tooltip") tooltip: ElementRef<HTMLDivElement>;

    public isTemplateRef: boolean = false;
    public _content: string | TemplateRef<any> = "";

    arrowClassName: string = "";

    constructor(private ngZone: NgZone) {}

    ngOnInit(): void {}

    get content(): string | TemplateRef<any> {
        return this._content;
    }

    @Input("content") set content(value: string | TemplateRef<any>) {
        this._content = value;
        this.isTemplateRef = value instanceof TemplateRef;
    }

    /** on tooltip blur */
    onBlur(event: FocusEvent): void {
        if (!this.tooltipReference.nativeElement.contains(event.relatedTarget as any)) {
            this.defocus.emit();
        }
    }

    ngAfterViewInit(): void {
        this.arrowClass.subscribe((res: string) => {
            this.ngZone.run(() => (this.arrowClassName = res));
        });
    }

    ngOnDestroy(): void {}
}
