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
    private pristine: boolean = true;
    private _toggle: boolean = false;

    /** Centers the modal in the middle of the screen */
    @Input() centered?: boolean;
    /** Modal size follows bootstrap sizes: `lg` and `sm` */
    @Input() size?: ModalSize;
    /** Modal position. Available positions: `left`, `right` */
    @Input() position?: ModalPosition;
    /** Modal toggle */
    @Input() get toggle(): boolean {
        return this._toggle;
    }
    set toggle(val: boolean) {
        if (this._toggle !== val) {
            this._toggle = val;

            if (this._toggle && this.escapeToDismiss) {
                window.addEventListener("keyup", this.escapeKeyListener);
            }

            // Unsubscribe as soon as the the modal is dismissed
            if (!this._toggle && this.escapeToDismiss) {
                window.removeEventListener("keyup", this.escapeKeyListener);
            }

            // This only runs once when the toggle value is changed
            if (this.pristine) {
                this.pristine = false;
            }
        }
    }
    /** Disables the ability to dismiss the modal when the backdrop is clicked */
    @Input() disableBackdropDismiss?: boolean;
    /** Disables the close button at the top right corner of the modal */
    @Input() disableCloseButton?: boolean;
    /** Fires a dismiss output when the escape key is registered. Default is true */
    @Input() escapeToDismiss?: boolean = true;
    /** Expands the modal to cover the whole screen */
    @Input() fullscreen?: boolean;
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

    /** Event triggered when the modal is dismissed. Can be triggered with close button or backdrop click */
    @Output() dismiss: EventEmitter<MouseEvent> = new EventEmitter();

    get modalClassName(): NgClassType {
        return {
            show: this.toggle,
            hide: !this.toggle && !this.pristine,
            "modal-centered": this.centered,
            "modal-fullscreen": this.fullscreen,
            [`modal-aside modal-aside-${this.position}`]: !!this.position,
            [this.className]: !!this.className,
        };
    }

    get dialogClassName(): NgClassType {
        return {
            [`modal-${this.size}`]: !!this.size,
        };
    }

    /**
     * Dismisses the modal
     * @param e clicked element
     */
    backdropClick(e: MouseEvent): void {
        e.stopPropagation();
        if (!this.disableBackdropDismiss) {
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
