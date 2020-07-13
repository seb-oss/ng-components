import { Component, Input, ViewEncapsulation, ComponentRef, HostListener, ElementRef, ViewChild, NgZone } from "@angular/core";
import { SebModalBackdropComponent } from "./modal.backdrop";
import { ModalService } from "./modal.service";
import { ModalSizeType, ModalPositionType } from "./modal.type";
import { AnimationEvent } from "@angular/animations";
import { fadeInAnimation } from "./animation";

@Component({
    selector: "sebng-modal",
    styleUrls: ["./modal.component.scss"],
    templateUrl: "./modal.component.html",
    encapsulation: ViewEncapsulation.None,
    animations: [fadeInAnimation],
})
export class ModalComponent {
    @Input() id?: string;
    @Input() size?: ModalSizeType;
    @Input() center?: boolean;
    @Input() position: ModalPositionType;
    @Input() fullscreen?: boolean;
    @Input() backdropDismiss?: boolean = true;
    @Input() escapeKeyDismiss?: boolean = true;
    @Input() className?: string;
    @Input() ariaLabel?: string;
    @Input() ariaDescribedby?: string;
    @Input() animationDuration?: string = ".15s";
    @ViewChild("modalRef") modalRef: ElementRef;
    backDropRef: ComponentRef<SebModalBackdropComponent>;
    toggle: boolean; // toggle is required to enable the open or close animation

    constructor(private modalService: ModalService, private _ngZone: NgZone) {}

    /**
     * construct the class names that needs to be appended to the modal depending on the inputs requested
     * @returns { [key: string]: boolean } key value pair for the positions of the modal
     */
    get modalPosition(): { [key: string]: boolean } {
        return {
            "modal-aside": !!this.position && !this.fullscreen,
            "modal-aside-left": this.position === "left",
            "modal-aside-right": this.position === "right",
            "modal-fullscreen": this.fullscreen,
        };
    }

    /**
     * emit close event when backdrop is clicked
     */
    @HostListener("click", ["$event"])
    onBackdropClick(event: MouseEvent): void {
        if (this.backdropDismiss) {
            if (event && event.target && event.target["classList"] && event.target["classList"].length) {
                const classList: DOMTokenList = event.target["classList"];
                if (classList.contains("modal")) {
                    this.close();
                }
            }
        }
    }

    /**
     * emit close when escape key is clicked
     */
    @HostListener("keyup", ["$event"])
    onEscKey(event: KeyboardEvent): void {
        if (this.escapeKeyDismiss && event.key.toLowerCase() === "escape") {
            this.close();
        }
    }

    get toggleState(): string {
        return this.toggle ? "open" : "close";
    }

    /**
     * append backrop to the body, open the modal and trigger the animation
     */
    open(): void {
        this.backDropRef = this.modalService.appendComponentToBody(SebModalBackdropComponent);
        this.modalService.open(this.modalRef);
        this.toggle = true;
    }

    /**
     * close the modal, trigger the anumation and remove the backdrop from the body using its reference
     */
    close(): void {
        this.modalService.close(this.modalRef);
        this.toggle = false;
        this.modalService.removeComponentFromBody(this.backDropRef);
    }

    /**
     * callback when the animation is done
     * @param event
     */
    onAnimationDone(event: AnimationEvent): void {
        if (event.toState === "open") {
            this._ngZone.runOutsideAngular(() => {
                setTimeout(() => this.modalRef.nativeElement.focus(), 0);
            });
        }
    }
}
