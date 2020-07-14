import {
    Component,
    ViewEncapsulation,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild,
    Output,
    EventEmitter,
    AfterViewInit,
    ChangeDetectorRef,
} from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { TooltipTheme, TooltipTrigger, TooltipPosition } from "./tooltip-content/tooltip-content.component";

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
    /** tooltip reference which also can be passed with ngcontent */
    @Input() tooltipReference: ElementRef<HTMLDivElement>;
    /** tooltip trigger method */
    @Input() trigger: TooltipTrigger = "hover";
    /** tooltip position */
    @Input() position: TooltipPosition = "top";
    /**  tooltip theme */
    @Input() theme: TooltipTheme = "default";
    /** CSS class */
    @Input() className?: string = "";
    /** <!-- skip --> */
    @ViewChild("ngContent") contentref: ElementRef<HTMLDivElement>;
    /** <!-- skip --> */
    stringContent: string = "";
    /** <!-- skip --> */
    hasContent: boolean = true;
    /** <!-- skip --> */
    constructor(private cdr: ChangeDetectorRef) { }

    ngAfterViewInit() {
        this.hasContent = this.contentref && this.contentref.nativeElement.childNodes.length > 0;
        this.cdr.detectChanges();
    }
}
