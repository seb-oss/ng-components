import { Component, Input, ViewEncapsulation, OnInit, OnChanges, SimpleChanges, HostBinding } from "@angular/core";

@Component({
    selector: "ac-modal",
    styleUrls: ["./modal.component.scss"],
    templateUrl: "./modal.component.html",
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnChanges {
    @Input() toggle: boolean;
    @Input() id?: string;
    @Input() fullscreen?: boolean;
    @Input() position?: "left" | "right";
    @Input() className?: string;
    @Input() disableBackdropDismiss?: boolean;
    @Input() ariaLabel?: string;
    @Input() ariaDescribedby?: string;
    @Input() dismissModal?: () => void;

    @HostBinding("attr.aria-live") ariaLive: string = "assertive";

    open: boolean;
    close: boolean;

    ngOnInit(): void {
        if (this.toggle) {
            this.open = true;
        }
    }

    /**
     * handle toggle changes by setting the internal open and close values
     * @param {SimpleChanges} changes changes of @input()
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.toggle) {
            if (changes.toggle.previousValue !== undefined) {
                if (changes.toggle.currentValue !== changes.toggle.previousValue) {
                    this.open = this.toggle;
                    this.close = !this.toggle;
                }
            }
        }
    }

    /**
     * set modal proper class names
     * @returns class names { [key: string]: boolean } object
     */
    setMyClasses(): { [key: string]: boolean } {
        return {
            "show": this.open,
            "fade": this.close,
            "modal-aside": !!this.position,
            "modal-aside-left": this.position === "left",
            "modal-aside-right": this.position === "right",
            "modal-fullscreen": this.fullscreen,
            [this.className]: !!this.className
        };
    }

    /**
     * emit toggleModal event when backdrop is clicked
     */
    closeModal(event: MouseEvent): void {
        if (event && event.target && event.target["classList"] && event.target["classList"].length) {
            const classList: DOMTokenList = event.target["classList"];
            if (classList.contains("modal")) {
                if (this.dismissModal) {
                    this.dismissModal();
                }
            }
        }
    }
}
