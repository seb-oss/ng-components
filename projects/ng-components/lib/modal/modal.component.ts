import { Component, Input, Output, EventEmitter, OnDestroy } from "@angular/core";

export type ModalPosition = "left" | "right" | null;
export type ModalSize = "lg" | "sm" | null;

type NgClassType = { [klass: string]: any };

/** The modal component provides a solid foundation for creating dialogs or slideout modals  */
@Component({
    selector: "sebng-modal",
    styleUrls: ["./modal.component.scss"],
    templateUrl: "./modal.component.html",
})
export class ModalComponent implements OnDestroy {
    /**
     * Keeps track of whether the toggle prop is pristine or not.
     * It's only used to not render `hide` class when the component just rendered.
     */
    private hidden: boolean = true;
    private _toggle: boolean = false;

    /** Modal size follows bootstrap sizes: `lg` and `sm` */
    @Input() size?: ModalSize;
    /** Modal position. Available positions: `left`, `right` */
    @Input() position?: ModalPosition;
    /** Centers the modal in the middle of the screen. Default is `false` */
    @Input() centered?: boolean = false;
    /** Expands the modal to cover the whole screen. Default is `false` */
    @Input() fullscreen?: boolean = false;
    /** The ability to dismiss the modal when the backdrop is clicked. Default is true */
    @Input() backdropDismiss?: boolean = true;
    /** A toggle that shows a close button at the top right corner. Default is true */
    @Input() closeButton?: boolean = true;
    /** Fires a dismiss output when the escape key is registered. Default is true */
    @Input() escapeToDismiss?: boolean = true;
    /** Element class */
    @Input() className?: string;
    /** Element id */
    @Input() id?: string;
    /** Disability descriptor */
    @Input() ariaLabel?: string;
    /** Disability descriptor */
    @Input() ariaLabelledby?: string;
    /** Disability descriptor */
    @Input() ariaDescribedby?: string;
    /** Modal toggle */
    @Input() get toggle(): boolean {
        return this._toggle;
    }
    set toggle(toggle: boolean) {
        if (this._toggle !== toggle) {
            this._toggle = toggle;

            if (toggle && this.escapeToDismiss) {
                window.addEventListener("keyup", this.escapeKeyListener);
            }

            // Unsubscribe as soon as the the modal is dismissed
            if (!toggle && this.escapeToDismiss) {
                window.removeEventListener("keyup", this.escapeKeyListener);
            }

            // This only runs once when the toggle value is changed
            if (toggle && this.hidden) {
                this.hidden = false;
            }
        }
    }

    /** Event triggered when the modal is dismissed. Can be triggered with close button or backdrop click */
    @Output() dismiss: EventEmitter<MouseEvent> = new EventEmitter();

    get modalClassName(): NgClassType {
        return {
            show: this.toggle,
            hide: !this.toggle && !this.hidden,
            "modal-centered": this.centered && !!!this.position && !this.fullscreen,
            "modal-fullscreen": this.fullscreen && !!!this.position,
            [`modal-aside modal-aside-${this.position}`]: !!this.position,
            [this.className]: !!this.className,
        };
    }

    get dialogClassName(): NgClassType {
        return {
            [`modal-${this.size}`]: !!this.size,
        };
    }

    animationEnded(e: TransitionEvent): void {
        if (!this.toggle) {
            this.hidden = true;
        }
    }

    /**
     * Dismisses the modal
     * @param e clicked element
     */
    backdropClick(e: MouseEvent): void {
        e.stopPropagation();
        if (this.backdropDismiss) {
            this.dismiss.emit(e);
        }
    }

    escapeKeyListener = (e: KeyboardEvent): void => {
        if (e.key.toLowerCase() === "escape" && this.escapeToDismiss) {
            this.dismiss.emit();
        }
    };

    ngOnDestroy(): void {
        window.removeEventListener("keyup", this.escapeKeyListener);
    }
}
