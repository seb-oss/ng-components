import { ConnectedOverlayPositionChange, ConnectionPositionPair } from "@angular/cdk/overlay";

export type TooltipPosition =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "left-top"
    | "left-bottom"
    | "right-top"
    | "right-bottom";

export const POSITION_MAP: { [key in TooltipPosition]: ConnectionPositionPair } = {
    top: { originX: "center", originY: "top", overlayX: "center", overlayY: "bottom" },
    "top-left": { originX: "start", originY: "top", overlayX: "start", overlayY: "bottom" },
    "top-right": { originX: "end", originY: "top", overlayX: "end", overlayY: "bottom" },
    "right-bottom": { originX: "end", originY: "bottom", overlayX: "start", overlayY: "bottom" },
    right: { originX: "end", originY: "center", overlayX: "start", overlayY: "center" },
    "right-top": { originX: "end", originY: "top", overlayX: "start", overlayY: "top" },
    "left-bottom": { originX: "start", originY: "bottom", overlayX: "end", overlayY: "bottom" },
    left: { originX: "start", originY: "center", overlayX: "end", overlayY: "center" },
    "left-top": { originX: "start", originY: "top", overlayX: "end", overlayY: "top" },
    bottom: { originX: "center", originY: "bottom", overlayX: "center", overlayY: "top" },
    "bottom-left": { originX: "start", originY: "bottom", overlayX: "start", overlayY: "top" },
    "bottom-right": { originX: "end", originY: "bottom", overlayX: "end", overlayY: "top" },
};

export const DEFAULT_TOOLTIP_POSITIONS = [POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left];

export const CASCADE_TOOLTIP_POSITIONS = Object.values(POSITION_MAP);

export function getPlacementName(position: ConnectedOverlayPositionChange): TooltipPosition {
    for (const placement in POSITION_MAP) {
        if (
            position.connectionPair.originX === POSITION_MAP[placement].originX &&
            position.connectionPair.originY === POSITION_MAP[placement].originY &&
            position.connectionPair.overlayX === POSITION_MAP[placement].overlayX &&
            position.connectionPair.overlayY === POSITION_MAP[placement].overlayY
        ) {
            return placement as TooltipPosition;
        }
    }
    return "top";
}
