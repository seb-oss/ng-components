import { Component, ViewEncapsulation, Input, TemplateRef } from "@angular/core";
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
export class TooltipComponent {
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

    @Input() ariaLabel: string = "";

    // @ViewChild("ngContent") contentref: ElementRef<HTMLDivElement>;

    stringContent: string = "";
    hasContent: boolean = true;
}
