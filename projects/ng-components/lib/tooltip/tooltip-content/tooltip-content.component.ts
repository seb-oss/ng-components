import { Component, ViewEncapsulation, ElementRef, Input, TemplateRef } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { TooltipPosition } from "../tooltip.positions";

export type TooltipTrigger = "hover" | "click";

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
export class TooltipContentComponent {
    @Input() tooltipReference: ElementRef<HTMLDivElement>;
    @Input() theme: TooltipTheme = "default";
    @Input() className?: string = "";
    @Input() position?: TooltipPosition = "top";

    public isTemplateRef: boolean = false;
    public _content: string | TemplateRef<any> = "";

    get content(): string | TemplateRef<any> {
        return this._content;
    }

    @Input("content") set content(value: string | TemplateRef<any>) {
        this._content = value;
        this.isTemplateRef = value instanceof TemplateRef;
    }
}
