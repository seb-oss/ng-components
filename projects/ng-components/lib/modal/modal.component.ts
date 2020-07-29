import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";

export type ModalPositionProp = "left" | "right" | null;
export type ModalSizeProp = "lg" | "sm" | null;

type NgClassType = { [klass: string]: any };

/** The modal component provides a solid foundation for creating dialogs or slideout modals  */
@Component({
    selector: "sebng-modal",
    styleUrls: ["./modal.component.scss"],
    templateUrl: "./modal.component.html",
})
export class ModalComponent implements OnChanges {
    /** Centers the modal in the middle of the screen */
    @Input() centered?: boolean;
    /** Modal size follows bootstrap sizes: `lg` and `sm` */
    @Input() size?: ModalSizeProp;
    /** Modal position. Available positions: `left`, `right` */
    @Input() position?: ModalPositionProp;
    /** Modal toggle */
    @Input() toggle: boolean;
    /** Disables the ability to dismiss the modal when the backdrop is clicked */
    @Input() disableBackdropDismiss?: boolean;
    /** Disables the close button at the top right corner of the modal */
    @Input() disableCloseButton?: boolean;
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
    @Output() dismiss: EventEmitter<void> = new EventEmitter();

    private prestine: { current: boolean } = { current: true };

    get modalClassName(): NgClassType {
        return {
            show: this.toggle,
            hide: !this.toggle && !this.prestine.current,
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
            this.dismiss.emit();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.toggle) {
            this.prestine.current = false;
        }
    }
}
