import { Component, Input, ViewEncapsulation, ComponentRef, HostListener, ElementRef, ViewChild } from "@angular/core";
import { SebModalBackdropComponent } from "./modal.backdrop";
import { ModalService } from "./modal.service";
import { ModalSizeType, ModalPositionType } from "./modal.config";
import { trigger, state, style, transition, animate } from "@angular/animations";

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
    @Input() className?: string;
    @ViewChild("modalRef") modalRef: ElementRef;
    toggle: boolean;

    backDropRef: ComponentRef<SebModalBackdropComponent>;

    constructor(private modalService: ModalService) {}

    get modalPosition(): { [key: string]: boolean } {
        return {
            "modal-aside": !!this.position && !this.fullscreen,
            "modal-aside-left": this.position === "left",
            "modal-aside-right": this.position === "right",
            "modal-fullscreen": this.fullscreen,
        };
    }

    /**
     * emit closeModal event when backdrop is clicked
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

    @HostListener("keyup.esc")
    onEscKey(): void {
        this.close();
    }

    open(): void {
        this.backDropRef = this.modalService.appendComponentToBody(SebModalBackdropComponent);
        this.modalService.open(this.modalRef);
        this.toggle = true;
    }

    close(): void {
        this.modalService.close(this.modalRef);
        this.toggle = false;
        this.modalService.removeComponentFromBody(this.backDropRef);
    }
}
