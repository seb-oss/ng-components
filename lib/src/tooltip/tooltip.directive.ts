import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, TemplateRef, HostBinding } from "@angular/core";
import { Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";

import { TooltipComponent, TooltipTrigger } from "./tooltip.component";

@Directive({ selector: "[sebng-tooltip]" })
export class TooltipDirective implements OnInit {
    @Input("sebng-tooltip") content: string | TemplateRef<any> = "";
    @Input() trigger: TooltipTrigger = "hover";

    @HostBinding("attr.tabindex") tabindex = "0";

    private overlayRef: OverlayRef;
    private tooltipRef: ComponentRef<TooltipComponent>;

    constructor(private overlay: Overlay, private overlayPositionBuilder: OverlayPositionBuilder, private elementRef: ElementRef) {}

    ngOnInit(): void {
        console.log(this.trigger);
        const positionStrategy = this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([
            {
                originX: "center",
                originY: "top",
                overlayX: "center",
                overlayY: "top",
                offsetY: -8,
            },
        ]);

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

    showTooltip() {
        this.tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
        this.tooltipRef.instance.text = this.content;
        this.tooltipRef.instance.tooltipReference = this.elementRef;
        this.tooltipRef.instance.defocus.subscribe((ev: boolean) => {
            if (ev) {
                this.overlayRef.detach();
            }
        });
        this.overlayRef.updatePosition();
    }
}
