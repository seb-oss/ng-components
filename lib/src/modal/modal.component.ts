import { Component, Input, ViewEncapsulation, ComponentRef, HostListener, ElementRef, ViewChild } from "@angular/core";
import { SebModalBackdropComponent } from "./modal.backdrop";
import { ModalService } from "./modal.service";
import { ModalSizeType, ModalPositionType } from "./modal.type";
import { trigger, state, style, transition, animate, AnimationEvent } from "@angular/animations";

@Component({
    selector: "sebng-modal",
    styleUrls: ["./modal.component.scss"],
    templateUrl: "./modal.component.html",
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger("openClose", [
            state(
                "open",
                style({
                    display: "block",
                })
            ),
            state(
                "close",
                style({
                    display: "none",
                })
            ),
            transition("open <=> close", [animate(".15s")]),
        ]),
    ],
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
    @ViewChild("modalRef") modalRef: ElementRef;
    backDropRef: ComponentRef<SebModalBackdropComponent>;
    toggle: boolean; // toggle is required to enable the open or close animation

    constructor(private modalService: ModalService) {}

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
        if (this.escapeKeyDismiss && event.keyCode === 27) {
            this.close();
        }
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
            setTimeout(() => this.modalRef.nativeElement.focus(), 0);
        }
    }
}
