import {
    ComponentRef,
    Directive,
    ElementRef,
    HostListener,
    Input,
    TemplateRef,
    OnDestroy,
    NgZone,
    Renderer2,
    AfterViewInit,
} from "@angular/core";
import {
    Overlay,
    OverlayRef,
    PositionStrategy,
    ConnectionPositionPair,
    OverlayConfig,
    ConnectedOverlayPositionChange,
    ScrollStrategy,
    FlexibleConnectedPositionStrategy,
} from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { TooltipContentComponent, TooltipTrigger, TooltipTheme } from "./tooltip-content/tooltip-content.component";
import { Subject, fromEvent } from "rxjs";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { isEqual } from "lodash";
import { getPlacementName, POSITION_MAP, DEFAULT_TOOLTIP_POSITIONS, TooltipPosition, CASCADE_TOOLTIP_POSITIONS } from "./tooltip.positions";

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
    /** reposition tooltip with more placement choices */
    @Input() cascade?: boolean;

    /** Close the tooltip once the user scrolls */
    @Input() closeOnScroll: boolean = false;

    /** Delay before closing on scroll */
    @Input() closeOnScrollDelay: number = 0;

    /** <!-- skip --> */
    private overlayRef: OverlayRef;
    /** <!-- skip --> */
    private tooltipRef: ComponentRef<TooltipContentComponent>;

    private listeners: Array<VoidFunction> = [];
    /** <!-- skip --> */
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private overlay: Overlay, private elementRef: ElementRef, private renderer: Renderer2, private ngZone: NgZone) {}

    private getOverlayConfig({ origin }): OverlayConfig {
        return new OverlayConfig({
            hasBackdrop: false,
            positionStrategy: this.getOverlayPosition(origin),
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });
    }

    private getOverlayPosition(origin: ElementRef): PositionStrategy {
        const positionStrategy: FlexibleConnectedPositionStrategy = this.overlay
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
                this.tooltipRef.instance.positionClass && this.tooltipRef.instance.positionClass.next(getPlacementName(newPosition));
            });

        return positionStrategy;
    }

    private getPositions(): ConnectionPositionPair[] {
        return [POSITION_MAP[this.position], ...(this.cascade ? CASCADE_TOOLTIP_POSITIONS : DEFAULT_TOOLTIP_POSITIONS)];
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

    @HostListener("blur")
    hideClick(): void {
        this.trigger === "focus" && this.overlayRef?.dispose();
    }

    /**
     * <!-- skip -->
     * Show tooltip
     */
    showTooltip(): void {
        this.overlayRef = this.overlay.create(this.getOverlayConfig({ origin: this.elementRef }));
        this.tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipContentComponent));
        this.overlayRef.outsidePointerEvents().subscribe(() => {
            this.overlayRef.dispose();
        });
        fromEvent(window, "scroll", { capture: true })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.overlayRef?.updatePosition();
                if (this.closeOnScroll) {
                    setTimeout(() => {
                        this.overlayRef?.dispose();
                    }, this.closeOnScrollDelay);
                }
            });

        if (this.position === ("right" || "left")) {
            setTimeout(() => {
                this.overlayRef.updatePosition();
            }, 0);
        }

        this.tooltipRef.instance.theme = this.theme;
        this.tooltipRef.instance.content = this.content;
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}
