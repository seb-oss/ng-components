import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, TemplateRef, HostBinding } from "@angular/core";
import { Overlay, OverlayPositionBuilder, OverlayRef, ConnectedPosition } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";

import { TooltipComponent, TooltipTrigger, TooltipPosition } from "./tooltip.component";

@Directive({ selector: "[sebng-tooltip]" })
export class TooltipDirective implements OnInit {
    @Input("sebng-tooltip") content: string | TemplateRef<any> = "";
    @Input() trigger: TooltipTrigger = "hover";
    @Input() position: TooltipPosition = "top";

    @HostBinding("attr.tabindex") tabindex = -1;

    private overlayRef: OverlayRef;
    private tooltipRef: ComponentRef<TooltipComponent>;

    constructor(private overlay: Overlay, private overlayPositionBuilder: OverlayPositionBuilder, private elementRef: ElementRef) {}

    ngOnInit(): void {
        console.log(this.trigger);
        const positionStrategy = this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([this.getPosition()]);

        this.overlayRef = this.overlay.create({ positionStrategy });
    }

    @HostListener("mouseenter")
    showHover() {
        this.trigger === "hover" && this.showTooltip();
    }

    @HostListener("mouseout")
    hideHover() {
        this.trigger === "hover" && this.overlayRef.detach();
    }

    @HostListener("click")
    showClick() {
        this.trigger === "click" && this.showTooltip();
    }

    @HostListener("blur", ["$event.relatedTarget"])
    hideClick(relatedTarget: HTMLDivElement) {
        if (!relatedTarget || !this.tooltipRef.instance.tooltip.nativeElement.contains(relatedTarget)) {
            this.trigger === "click" && this.overlayRef.detach();
        }
    }

    getPosition(): ConnectedPosition {
        if (this.position === "top" || this.position === "bottom") {
            return {
                originX: "center",
                originY: this.position,
                overlayX: "center",
                overlayY: this.position === "top" ? "bottom" : "top",
            };
        } else if (this.position === "left" || this.position === "right") {
            const isLeft: boolean = this.position === "left";
            return {
                originX: isLeft ? "start" : "end",
                originY: "center",
                overlayX: isLeft ? "end" : "start",
                overlayY: "center",
            };
        }
    }

    showTooltip() {
        this.tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
        this.tooltipRef.instance.text = this.content;
        this.tooltipRef.instance.position = this.position;
        this.tooltipRef.instance.tooltipReference = this.elementRef;
        this.tooltipRef.instance.defocus.subscribe((ev: boolean) => {
            if (ev) {
                this.overlayRef.detach();
            }
        });
        this.overlayRef.updatePosition();
    }
}
