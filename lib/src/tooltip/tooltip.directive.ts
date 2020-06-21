import {
    ComponentRef,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    TemplateRef,
    HostBinding,
    OnChanges,
    OnDestroy,
} from "@angular/core";
import {
    Overlay,
    OverlayPositionBuilder,
    OverlayRef,
    ConnectedPosition,
    PositionStrategy,
    FlexibleConnectedPositionStrategy,
    ConnectedOverlayPositionChange,
} from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";

import { TooltipContentComponent, TooltipTrigger, TooltipPosition, TooltipTheme } from "./tooltip-content/tooltip-content.component";
import { Observable, Subscription } from "rxjs";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import { isEqual } from "lodash";

type Placement = {
    [K in TooltipPosition]: ConnectedPosition;
};

@Directive({ selector: "[sebng-tooltip]" })
export class TooltipDirective implements OnInit, OnDestroy {
    @Input("sebng-tooltip") content: string | TemplateRef<any> = "";
    @Input() trigger: TooltipTrigger = "hover";
    @Input() position: TooltipPosition = "top";
    @Input() theme: TooltipTheme = "default";

    @HostBinding("attr.tabindex") tabindex = -1;

    private overlayRef: OverlayRef;
    private tooltipRef: ComponentRef<TooltipContentComponent>;
    private placements: Placement = {
        left: this.getOriginPosition("start", "center", "end", "center"),
        "left-top": this.getOriginPosition("start", "top", "end", "top"),
        "left-bottom": this.getOriginPosition("start", "bottom", "end", "bottom"),
        bottom: this.getOriginPosition("center", "bottom", "center", "top"),
        "bottom-left": this.getOriginPosition("start", "bottom", "start", "top"),
        "bottom-right": this.getOriginPosition("end", "bottom", "end", "top"),
        right: this.getOriginPosition("end", "center", "start", "center"),
        "right-top": this.getOriginPosition("end", "top", "start", "top"),
        "right-bottom": this.getOriginPosition("end", "bottom", "start", "bottom"),
        "top-left": this.getOriginPosition("start", "top", "start", "bottom"),
        "top-right": this.getOriginPosition("end", "top", "end", "bottom"),
        top: this.getOriginPosition("center", "top", "center", "bottom"),
    };
    private obs: Subscription;

    constructor(private overlay: Overlay, private overlayPositionBuilder: OverlayPositionBuilder, private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.overlayRef = this.overlay.create({ positionStrategy: this.getOverlayPositionStrategy() });
    }

    ngOnDestroy(): void {
        if (this.obs) {
            this.obs.unsubscribe();
        }
    }

    @HostListener("mouseenter")
    showHover() {
        this.trigger === "hover" && this.showTooltip();
    }

    @HostListener("mouseout", ["$event"])
    hideHover(event: MouseEvent) {
        if (this.elementRef.nativeElement.contains(event.relatedTarget)) {
            return;
        }
        this.trigger === "hover" && this.overlayRef.detach();
    }

    @HostListener("click")
    showClick() {
        this.trigger === "click" && this.showTooltip();
    }

    @HostListener("focus")
    showFocus() {
        this.trigger === "focus" && this.showTooltip();
    }

    @HostListener("blur", ["$event.relatedTarget"])
    hideClick(relatedTarget: HTMLDivElement) {
        if (!relatedTarget || !this.tooltipRef.instance.tooltip.nativeElement.contains(relatedTarget)) {
            (this.trigger === "click" || this.trigger === "focus") && this.overlayRef.detach();
        }
    }

    private getOverlayPositionStrategy(): PositionStrategy {
        const positionStrategy: FlexibleConnectedPositionStrategy = this.overlayPositionBuilder
            .flexibleConnectedTo(this.elementRef)
            .withPositions([this.getPosition(), this.getOriginPosition("end", "center", "start", "center")]);
        this.obs = positionStrategy.positionChanges.pipe(distinctUntilChanged((prev, curr) => isEqual(prev, curr))).subscribe(test => {
            console.log(test);
        });
        return positionStrategy;
    }

    private getOriginPosition(
        originX: ConnectedPosition["originX"],
        originY: ConnectedPosition["originY"],
        overlayX: ConnectedPosition["overlayX"],
        overlayY: ConnectedPosition["overlayY"]
    ): ConnectedPosition {
        return { originX, originY, overlayX, overlayY };
    }

    getPosition(): ConnectedPosition {
        switch (this.position) {
            case "left":
                return this.getOriginPosition("start", "center", "end", "center");
            case "left-top":
                return this.getOriginPosition("start", "top", "end", "top");
            case "left-bottom":
                return this.getOriginPosition("start", "bottom", "end", "bottom");
            case "bottom":
                return this.getOriginPosition("center", "bottom", "center", "top");
            case "bottom-left":
                return this.getOriginPosition("start", "bottom", "start", "top");
            case "bottom-right":
                return this.getOriginPosition("end", "bottom", "end", "top");
            case "right":
                return this.getOriginPosition("end", "center", "start", "center");
            case "right-top":
                return this.getOriginPosition("end", "top", "start", "top");
            case "right-bottom":
                return this.getOriginPosition("end", "bottom", "start", "bottom");
            case "top-left":
                return this.getOriginPosition("start", "top", "start", "bottom");
            case "top-right":
                return this.getOriginPosition("end", "top", "end", "bottom");
            default:
                return this.getOriginPosition("center", "top", "center", "bottom");
        }
    }

    showTooltip() {
        this.tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipContentComponent));
        this.tooltipRef.instance.content = this.content;
        this.tooltipRef.instance.position = this.position;
        this.tooltipRef.instance.theme = this.theme;
        this.tooltipRef.instance.tooltipReference = this.elementRef;
        this.tooltipRef.instance.defocus.subscribe((ev: boolean) => {
            if (ev) {
                this.overlayRef.detach();
            }
        });

        this.overlayRef.updatePositionStrategy(this.getOverlayPositionStrategy());
        this.overlayRef.updatePosition();
    }
}
