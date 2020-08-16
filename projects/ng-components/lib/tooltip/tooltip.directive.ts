import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, TemplateRef, HostBinding, OnDestroy } from "@angular/core";
import {
    Overlay,
    OverlayRef,
    ConnectedPosition,
    PositionStrategy,
    ConnectionPositionPair,
    OverlayConfig,
    ConnectedOverlayPositionChange,
    ScrollStrategy,
} from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { TooltipContentComponent, TooltipTrigger, TooltipPosition, TooltipTheme } from "./tooltip-content/tooltip-content.component";
import { Subscription } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { isEqual } from "lodash";

type Placement = {
    [K in TooltipPosition]: ConnectedPosition;
};

export type TooltipAnchorPositionPair = ConnectionPositionPair;

/**
 * A text label that acts as a helper to a specific item
 */
@Directive({ selector: "[sebng-tooltip]" })
export class TooltipDirective implements OnInit, OnDestroy {
    /** content of tooltip */
    @Input("sebng-tooltip") content: string | TemplateRef<any> = "";
    /** tooltip trigger method */
    @Input() trigger: TooltipTrigger = "hover";
    /** tooltip position */
    @Input() position: TooltipPosition = "top";
    /** tooltip theme */
    @Input() theme: TooltipTheme = "default";
    /** CSS class */
    @Input() className?: string = "";

    @Input() closeOnScroll: boolean = false;

    @Input() closeOnScrollThreshold: number = 0;

    @HostBinding("attr.tabindex") tabindex = -1;
    /** <!-- skip --> */
    private overlayRef: OverlayRef;
    /** <!-- skip --> */
    private tooltipRef: ComponentRef<TooltipContentComponent>;

    positions: TooltipAnchorPositionPair[] = [
        { overlayX: "center", overlayY: "bottom", originX: "center", originY: "top", offsetX: 0, offsetY: 0 },
        { overlayX: "start", overlayY: "bottom", originX: "start", originY: "top", offsetX: 0, offsetY: 0 },
        { overlayX: "end", overlayY: "bottom", originX: "end", originY: "top", offsetX: 0, offsetY: 0 },
        { overlayX: "center", overlayY: "top", originX: "center", originY: "bottom", offsetX: 0, offsetY: 0 },
        { overlayX: "start", overlayY: "top", originX: "start", originY: "bottom", offsetX: 0, offsetY: 0 },
        { overlayX: "end", overlayY: "top", originX: "end", originY: "bottom", offsetX: 0, offsetY: 0 },
    ];

    constructor(private overlay: Overlay, private elementRef: ElementRef) {}

    ngOnInit(): void {}

    private getOverlayConfig({ origin }): OverlayConfig {
        return new OverlayConfig({
            hasBackdrop: true,
            backdropClass: "popover-backdrop",
            positionStrategy: this.getOverlayPosition(origin),
            scrollStrategy: this.getScrollStrategy(),
        });
    }

    private getScrollStrategy(): ScrollStrategy {
        if (this.closeOnScroll) {
            return this.overlay.scrollStrategies.close({
                threshold: this.closeOnScrollThreshold,
            });
        } else {
            return this.overlay.scrollStrategies.reposition();
        }
    }

    private getOverlayPosition(origin: ElementRef): PositionStrategy {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(origin)
            .withPositions(this.getPositions())
            .withFlexibleDimensions(false)
            .withPush(false);

        positionStrategy.positionChanges
            .pipe(distinctUntilChanged((prev: ConnectedOverlayPositionChange, curr: ConnectedOverlayPositionChange) => isEqual(prev, curr)))
            .subscribe((newPosition: ConnectedOverlayPositionChange) => {
                const arrowClassNew: string = `arrow-${newPosition.connectionPair.overlayX} arrow-${newPosition.connectionPair.overlayY}`;
                this.tooltipRef.instance.arrowClass && this.tooltipRef.instance.arrowClass.next(arrowClassNew);
            });

        return positionStrategy;
    }

    private getPositions(): ConnectionPositionPair[] {
        return [
            { overlayX: "center", overlayY: "bottom", originX: "center", originY: "top", offsetX: 0, offsetY: 0 },
            { overlayX: "start", overlayY: "bottom", originX: "start", originY: "top", offsetX: 0, offsetY: 0 },
            { overlayX: "end", overlayY: "bottom", originX: "end", originY: "top", offsetX: 0, offsetY: 0 },
            { overlayX: "center", overlayY: "top", originX: "center", originY: "bottom", offsetX: 0, offsetY: 0 },
            { overlayX: "start", overlayY: "top", originX: "start", originY: "bottom", offsetX: 0, offsetY: 0 },
            { overlayX: "end", overlayY: "top", originX: "end", originY: "bottom", offsetX: 0, offsetY: 0 },
        ];
    }

    ngOnDestroy(): void {}

    // @HostListener("mouseenter") showHover(): void {
    //     this.trigger === "hover" && this.showTooltip();
    // }

    // @HostListener("mouseout", ["$event"]) hideHover(event: MouseEvent): void {
    //     if (this.elementRef.nativeElement.contains(event.relatedTarget)) {
    //         return;
    //     }
    //     this.trigger === "hover" && this.overlayRef.dispose();
    // }

    @HostListener("click") showClick(): void {
        this.trigger === "click" && this.showTooltip();
    }

    // @HostListener("focusin", ["$event"])
    // /** <!-- skip --> */
    // showFocusWithin(event: FocusEvent): void {
    //     if (this.elementRef.nativeElement.contains(event.target)) {
    //         this.trigger === "focus" && this.showTooltip();
    //     }
    // }

    // @HostListener("blur", ["$event.relatedTarget"]) hideClick(relatedTarget: HTMLDivElement): void {
    //     this.hideTooltip(relatedTarget);
    // }

    /**
     * <!-- skip -->
     * Show tooltip
     */
    showTooltip(): void {
        this.overlayRef = this.overlay.create(this.getOverlayConfig({ origin: this.elementRef }));
        this.tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipContentComponent));
        this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose());
        this.tooltipRef.instance.content = this.content;
    }
}
