import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ac-tooltip",
    templateUrl: "./tooltip.component.html",
    styleUrls: ["./tooltip.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class TooltipComponent {
    @Input() title?: string;
    @Input() message?: string;
    @Input() messageGroup?: Array<TooltipMessageGroupItem>;
    @Input() position?: string = "bottom";
    @Input() customSvg?: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z" /></svg>`;
    @Input() width?: number = 120;
    @Input() theme?: string = "default";
    @Input() className?: string;
    @Input() triggerOnHover?: boolean;
    @Input() clickAction?: (e?: any) => void;

    toggle: boolean = false;

    constructor() {
        this.forceDismiss = this.forceDismiss.bind(this);
        this.forceShow = this.forceShow.bind(this);
    }

    toggleTooltip(state?: boolean, e?: any) {
        if (state !== undefined) {
            this.toggle = state;
        } else {
            this.toggle = !this.toggle;
        }

        this.clickAction && this.clickAction(e);
    }

    isPositioned(search: string) {
        return this.position.search(search) === 0;
    }

    /**
     * Forces the tooltip to dismiss
     * @param {MouseEvent} e Mouse event
     */
    forceDismiss(e?: MouseEvent) {
        if (e) {
            switch ((e.target as HTMLElement).className) {
                case "icon":
                case "message":
                case "message-container":
                case "triangle":
                    return;
                default: this.toggle = false;
            }
        } else {
            this.toggle = false;
        }
    }

    /** Forces the tooltip to show */
    forceShow() {
        !this.toggle && (this.toggle = true);
    }
}

export interface TooltipMessageGroupItem {
    title?: string;
    message: string;
}
