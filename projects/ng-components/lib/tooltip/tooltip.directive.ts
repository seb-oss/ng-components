import { ComponentRef, Directive, ElementRef, HostListener, Input, TemplateRef, OnDestroy, NgZone } from "@angular/core";
import {
    Overlay,
    OverlayRef,
    PositionStrategy,
    ConnectionPositionPair,
    OverlayConfig,
    ConnectedOverlayPositionChange,
    ScrollStrategy,
} from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { TooltipContentComponent, TooltipTrigger, TooltipPosition, TooltipTheme } from "./tooltip-content/tooltip-content.component";
import { Subject, fromEvent } from "rxjs";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { isEqual } from "lodash";
import { getPlacementName } from "./tooltip.positions";

export type TooltipAnchorPositionPair = ConnectionPositionPair;

/**
 * A text label that acts as a helper to a specific item
 */
@Directive({ selector: "[sebng-tooltip]" })
export class TooltipDirective implements OnDestroy {
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
    /** Close the tooltip once the user scrolls */
    @Input() closeOnScroll: boolean = false;

    /** Amount of pixels the user has to scroll before the overlay is closed. */
    @Input() closeOnScrollThreshold: number = 200;

    /** <!-- skip --> */
    private overlayRef: OverlayRef;
    /** <!-- skip --> */
    private tooltipRef: ComponentRef<TooltipContentComponent>;

    /** <!-- skip --> */
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private overlay: Overlay, private elementRef: ElementRef, private ngZone: NgZone) {}

    private getOverlayConfig({ origin }): OverlayConfig {
        return new OverlayConfig({
            hasBackdrop: false,
            positionStrategy: this.getOverlayPosition(origin),
            scrollStrategy: this.getScrollStrategy(),
        });
    }

    private getScrollStrategy(): ScrollStrategy {
        if (this.closeOnScroll) {
            // TODO Not working
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
            .pipe(
                distinctUntilChanged((prev: ConnectedOverlayPositionChange, curr: ConnectedOverlayPositionChange) => isEqual(prev, curr)),
                takeUntil(this.destroy$)
            )
            .subscribe((newPosition: ConnectedOverlayPositionChange) => {
                this.tooltipRef.instance.arrowClass && this.tooltipRef.instance.arrowClass.next(getPlacementName(newPosition));
            });

        return positionStrategy;
    }

    private getPositions(): ConnectionPositionPair[] {
        return [
            new ConnectionPositionPair({ originX: "center", originY: "top" }, { overlayX: "center", overlayY: "bottom" }), //top
            new ConnectionPositionPair({ originX: "center", originY: "top" }, { overlayX: "center", overlayY: "bottom" }), //topCenter
            new ConnectionPositionPair({ originX: "start", originY: "top" }, { overlayX: "start", overlayY: "bottom" }), //topLeft
            new ConnectionPositionPair({ originX: "end", originY: "top" }, { overlayX: "end", overlayY: "bottom" }), //topRight:
            new ConnectionPositionPair({ originX: "end", originY: "bottom" }, { overlayX: "start", overlayY: "bottom" }), //rightBottom:
            new ConnectionPositionPair({ originX: "end", originY: "center" }, { overlayX: "start", overlayY: "center" }), //right:
            new ConnectionPositionPair({ originX: "end", originY: "top" }, { overlayX: "start", overlayY: "top" }), //rightTop:

            new ConnectionPositionPair({ originX: "start", originY: "bottom" }, { overlayX: "end", overlayY: "bottom" }), //leftBottom:
            new ConnectionPositionPair({ originX: "start", originY: "center" }, { overlayX: "end", overlayY: "center" }), //left:
            new ConnectionPositionPair({ originX: "start", originY: "top" }, { overlayX: "end", overlayY: "top" }), //leftTop:

            new ConnectionPositionPair({ originX: "center", originY: "bottom" }, { overlayX: "center", overlayY: "top" }), //bottom:
            new ConnectionPositionPair({ originX: "center", originY: "bottom" }, { overlayX: "center", overlayY: "top" }), //bottomCenter:
            new ConnectionPositionPair({ originX: "start", originY: "bottom" }, { overlayX: "start", overlayY: "top" }), //bottomLeft:
            new ConnectionPositionPair({ originX: "end", originY: "bottom" }, { overlayX: "end", overlayY: "top" }), //bottomRight:
        ];
    }

    @HostListener("mouseenter")
    showHover(): void {
        this.trigger === "hover" && this.showTooltip();
    }

    @HostListener("mouseout", ["$event"])
    hideHover(event: MouseEvent): void {
        if (this.elementRef.nativeElement.contains(event.relatedTarget)) {
            return;
        }
        this.trigger === "hover" && this.overlayRef.dispose();
    }

    @HostListener("click")
    showClick(): void {
        this.trigger === "click" && this.showTooltip();
    }

    @HostListener("focusin", ["$event"])
    /** <!-- skip --> */
    showFocusWithin(event: FocusEvent): void {
        if (this.elementRef.nativeElement.contains(event.target)) {
            this.trigger === "focus" && this.showTooltip();
        }
    }

    @HostListener("blur", ["$event.relatedTarget"])
    hideClick(relatedTarget: HTMLDivElement): void {
        this.trigger === "focus" && this.overlayRef?.dispose();
    }

    /**
     * <!-- skip -->
     * Show tooltip
     */
    showTooltip(): void {
        this.overlayRef = this.overlay.create(this.getOverlayConfig({ origin: this.elementRef }));
        this.tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipContentComponent));
        this.overlayRef.outsidePointerEvents().subscribe((event: MouseEvent) => {
            this.overlayRef.dispose();
        });
        this.ngZone.runOutsideAngular(() => {
            return fromEvent(window, "scroll", { capture: true })
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => (this.closeOnScroll ? this.overlayRef?.dispose() : this.overlayRef?.updatePosition()));
        });

        this.tooltipRef.instance.content = this.content;
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}
