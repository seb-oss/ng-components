import {
    ComponentRef,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    TemplateRef,
    HostBinding,
    OnDestroy,
    NgZone,
} from "@angular/core";
import {
    Overlay,
    OverlayPositionBuilder,
    OverlayRef,
    ConnectedPosition,
    PositionStrategy,
    FlexibleConnectedPositionStrategy,
    ConnectedOverlayPositionChange,
    ScrollDispatcher,
    CdkScrollable,
} from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { TooltipContentComponent, TooltipTrigger, TooltipPosition, TooltipTheme } from "./tooltip-content/tooltip-content.component";
import { Subscription, fromEvent, of } from "rxjs";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import { isEqual } from "lodash";

type Placement = {
    [K in TooltipPosition]: ConnectedPosition;
};

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

    @HostBinding("attr.tabindex") tabindex = -1;
    /** <!-- skip --> */
    private overlayRef: OverlayRef;
    /** <!-- skip --> */
    private tooltipRef: ComponentRef<TooltipContentComponent>;
    /** <!-- skip --> */
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
    /** <!-- skip --> */
    private obs: Subscription;
    private isShown: boolean;
    private scrollAncestors: Array<CdkScrollable>;
    private globalSubscription: Subscription;

    constructor(
        private overlay: Overlay,
        private overlayPositionBuilder: OverlayPositionBuilder,
        private scrollDispatcher: ScrollDispatcher,
        private ngZone: NgZone,
        private elementRef: ElementRef
    ) {}

    ngOnInit(): void {
        this.overlayRef = this.overlay.create({
            positionStrategy: this.getOverlayPositionStrategy(),
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });
    }

    ngOnDestroy(): void {
        if (this.obs) {
            this.obs.unsubscribe();
        }
        if (this.globalSubscription) {
            this.globalSubscription.unsubscribe();
        }
    }

    @HostListener("mouseenter") showHover(): void {
        this.trigger === "hover" && this.showTooltip();
    }

    @HostListener("mouseout", ["$event"]) hideHover(event: MouseEvent): void {
        if (this.elementRef.nativeElement.contains(event.relatedTarget)) {
            return;
        }
        this.trigger === "hover" && this.removeTooltipFromOverlay();
    }

    @HostListener("click") showClick(): void {
        this.trigger === "click" && this.showTooltip();
    }

    @HostListener("focusin", ["$event"])
    /** <!-- skip --> */
    showFocusWithin(event: FocusEvent): void {
        if (this.elementRef.nativeElement.contains(event.target)) {
            this.trigger === "focus" && this.showTooltip();
        }
    }

    @HostListener("focusout", ["$event.relatedTarget"]) hideFocusOut(relatedTarget: HTMLDivElement): void {
        this.hideTooltip(relatedTarget);
    }

    @HostListener("blur", ["$event.relatedTarget"]) hideClick(relatedTarget: HTMLDivElement): void {
        this.hideTooltip(relatedTarget);
    }

    /** get overlay position strategy */
    private getOverlayPositionStrategy(): PositionStrategy {
        this.scrollAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);
        const positionStrategy: FlexibleConnectedPositionStrategy = this.overlayPositionBuilder
            .flexibleConnectedTo(this.elementRef)
            .withPositions(this.getPosition())
            .withScrollableContainers(this.scrollAncestors);
        this.obs = positionStrategy.positionChanges
            .pipe(distinctUntilChanged((prev: ConnectedOverlayPositionChange, curr: ConnectedOverlayPositionChange) => isEqual(prev, curr)))
            .subscribe((newPosition: ConnectedOverlayPositionChange) => {
                if (newPosition.scrollableViewProperties.isOverlayClipped && this.isShown) {
                    this.ngZone.run(() => this.removeTooltipFromOverlay());
                    return;
                }
                Object.keys(this.placements).map((key: TooltipPosition) => {
                    if (isEqual(this.placements[key], newPosition.connectionPair)) {
                        this.position = key;
                        this.tooltipRef.instance.position = this.position;
                    }
                });
            });
        return positionStrategy;
    }

    /** get overlay origin position */
    private getOriginPosition(
        originX: ConnectedPosition["originX"],
        originY: ConnectedPosition["originY"],
        overlayX: ConnectedPosition["overlayX"],
        overlayY: ConnectedPosition["overlayY"]
    ): ConnectedPosition {
        return { originX, originY, overlayX, overlayY };
    }

    /**
     * <!-- skip -->
     * remove tooltip from overlay
     */
    private removeTooltipFromOverlay(): void {
        this.overlayRef.detach();
        this.isShown = false;
        if (this.globalSubscription) {
            this.globalSubscription.unsubscribe();
        }
    }

    /**
     * add scroll event listener if cdkScrollable is not found
     */
    private addGlobalListener(): void {
        if (
            !this.scrollAncestors?.length ||
            this.scrollAncestors.every((ancestor: CdkScrollable) =>
                this.elementRef.nativeElement?.contains(ancestor.getElementRef().nativeElement)
            )
        ) {
            this.globalSubscription = this.ngZone.runOutsideAngular(() => {
                return fromEvent(window, "scroll", { capture: true }).subscribe(() => this.overlayRef.updatePosition());
            });
        }
    }

    /** <!-- skip --> get tooltip position */
    getPosition(): Array<ConnectedPosition> {
        switch (this.position) {
            case "left":
                return [this.placements.left, this.placements.right, this.placements.top, this.placements.bottom];
            case "left-top":
                return [
                    this.placements["left-top"],
                    this.placements["right-top"],
                    this.placements["top-left"],
                    this.placements["bottom-left"],
                ];
            case "left-bottom":
                return [
                    this.placements["left-bottom"],
                    this.placements["right-bottom"],
                    this.placements["bottom-left"],
                    this.placements["top-left"],
                ];
            case "bottom":
                return [this.placements.bottom, this.placements.top, this.placements.left, this.placements.right];
            case "bottom-left":
                return [
                    this.placements["bottom-left"],
                    this.placements["top-left"],
                    this.placements["left-bottom"],
                    this.placements["right-bottom"],
                ];
            case "bottom-right":
                return [
                    this.placements["bottom-right"],
                    this.placements["top-right"],
                    this.placements["right-bottom"],
                    this.placements["left-bottom"],
                ];
            case "right":
                return [this.placements.right, this.placements.left, this.placements.top, this.placements.bottom];
            case "right-top":
                return [
                    this.placements["right-top"],
                    this.placements["left-top"],
                    this.placements["top-right"],
                    this.placements["bottom-right"],
                ];
            case "right-bottom":
                return [
                    this.placements["right-bottom"],
                    this.placements["left-bottom"],
                    this.placements["bottom-right"],
                    this.placements["top-right"],
                ];
            case "top-left":
                return [
                    this.placements["top-left"],
                    this.placements["bottom-left"],
                    this.placements["left-top"],
                    this.placements["right-top"],
                ];
            case "top-right":
                return [
                    this.placements["top-right"],
                    this.placements["bottom-right"],
                    this.placements["right-top"],
                    this.placements["left-top"],
                ];
            default:
                return [this.placements.top, this.placements.bottom, this.placements.left, this.placements.right];
        }
    }

    /**
     * <!-- skip -->
     * Show tooltip
     */
    showTooltip(): void {
        if (!this.overlayRef.hasAttached()) {
            this.tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipContentComponent));
        }
        this.tooltipRef.instance.content = this.content;
        this.tooltipRef.instance.position = this.position;
        this.tooltipRef.instance.theme = this.theme;
        this.tooltipRef.instance.tooltipReference = this.elementRef;
        this.tooltipRef.instance.className = this.className;
        this.tooltipRef.instance.defocus.subscribe(() => this.removeTooltipFromOverlay());

        this.overlayRef.updatePositionStrategy(this.getOverlayPositionStrategy());
        this.overlayRef.updatePosition();
        this.addGlobalListener();
        this.isShown = true;
    }

    /**
     * <!-- skip -->
     * hide tooltip
     * @param relatedTarget target related
     */
    hideTooltip(relatedTarget: HTMLDivElement): void {
        if (!relatedTarget || !this.tooltipRef.instance.tooltip.nativeElement.contains(relatedTarget)) {
            (this.trigger === "click" || this.trigger === "focus") && this.removeTooltipFromOverlay();
        }
    }
}
