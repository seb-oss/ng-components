import { Component, ViewEncapsulation, Input, TemplateRef, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { TooltipTheme, TooltipTrigger } from "./tooltip-content/tooltip-content.component";
import { TooltipPosition } from "./tooltip.positions";
import { TooltipDirective } from "./tooltip.directive";

/** A text label that acts as a helper to a specific item */
@Component({
    selector: "sebng-tooltip",
    templateUrl: "./tooltip.component.html",
    styleUrls: ["./tooltip.component.scss"],
    animations: [
        trigger("tooltip", [
            transition(":enter", [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
            transition(":leave", [animate(300, style({ opacity: 0 }))]),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements AfterViewInit {
    /** content of tooltip */
    @Input() content: string | TemplateRef<any> = "";
    /** tooltip text reference with default SEB style */
    @Input() textReference: string = "";
    /** tooltip trigger method */
    @Input() trigger: TooltipTrigger = "hover";
    /** tooltip position */
    @Input() position: TooltipPosition = "top";
    /**  tooltip theme */
    @Input() theme: TooltipTheme = "default";
    /** CSS class */
    @Input() className?: string = "";

    /** Close the tooltip once the user scrolls */
    @Input() closeOnScroll: boolean = false;

    /** Delay before closing on scroll */
    @Input() closeOnScrollDelay: number = 0;

    /** reposition tooltip with more position choices (top-right, bottom-left, right-top, ....) */
    @Input() cascade?: boolean = false;

    @ViewChild("ngContent") contentref: ElementRef<HTMLDivElement>;

    @ViewChild(TooltipDirective) tooltipDirective: TooltipDirective;

    stringContent: string = "";
    hasContent: boolean = true;

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.hasContent = this.contentref && this.contentref.nativeElement.childNodes.length > 0;
        this.cdr.detectChanges();
    }

    show(): void {
        this.tooltipDirective.showTooltip();
    }

    hide(): void {
        this.tooltipDirective.hideTooltip();
    }
}
