import { ConnectedOverlayPositionChange, ConnectionPositionPair } from "@angular/cdk/overlay";

export const POSITION_MAP: { [key: string]: ConnectionPositionPair } = {
    top: new ConnectionPositionPair({ originX: "center", originY: "top" }, { overlayX: "center", overlayY: "bottom" }),
    ["top-center"]: new ConnectionPositionPair({ originX: "center", originY: "top" }, { overlayX: "center", overlayY: "bottom" }),
    ["top-left"]: new ConnectionPositionPair({ originX: "start", originY: "top" }, { overlayX: "start", overlayY: "bottom" }),
    ["top-right"]: new ConnectionPositionPair({ originX: "end", originY: "top" }, { overlayX: "end", overlayY: "bottom" }),
    right: new ConnectionPositionPair({ originX: "end", originY: "center" }, { overlayX: "start", overlayY: "center" }),
    ["right-top"]: new ConnectionPositionPair({ originX: "end", originY: "top" }, { overlayX: "start", overlayY: "top" }),
    ["right-bottom"]: new ConnectionPositionPair({ originX: "end", originY: "bottom" }, { overlayX: "start", overlayY: "bottom" }),
    bottom: new ConnectionPositionPair({ originX: "center", originY: "bottom" }, { overlayX: "center", overlayY: "top" }),
    ["bottom-center"]: new ConnectionPositionPair({ originX: "center", originY: "bottom" }, { overlayX: "center", overlayY: "top" }),
    ["bottom-left"]: new ConnectionPositionPair({ originX: "start", originY: "bottom" }, { overlayX: "start", overlayY: "top" }),
    ["bottom-right"]: new ConnectionPositionPair({ originX: "end", originY: "bottom" }, { overlayX: "end", overlayY: "top" }),
    left: new ConnectionPositionPair({ originX: "start", originY: "center" }, { overlayX: "end", overlayY: "center" }),
    ["left-top"]: new ConnectionPositionPair({ originX: "start", originY: "top" }, { overlayX: "end", overlayY: "top" }),
    ["left-bottom"]: new ConnectionPositionPair({ originX: "start", originY: "bottom" }, { overlayX: "end", overlayY: "bottom" }),
};

export const DEFAULT_TOOLTIP_POSITIONS = [POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left];

export function getPlacementName(position: ConnectedOverlayPositionChange): string | undefined {
    for (const placement in POSITION_MAP) {
        if (
            position.connectionPair.originX === POSITION_MAP[placement].originX &&
            position.connectionPair.originY === POSITION_MAP[placement].originY &&
            position.connectionPair.overlayX === POSITION_MAP[placement].overlayX &&
            position.connectionPair.overlayY === POSITION_MAP[placement].overlayY
        ) {
            console.log(placement);
            return placement;
        }
    }
    return undefined;
}
