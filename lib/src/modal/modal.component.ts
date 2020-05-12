import { Component, Input, ViewEncapsulation, ComponentRef, HostListener, ElementRef, ViewChild } from "@angular/core";
import { SebModalBackdropComponent } from "./modal.backdrop";
import { ModalService } from "./modal.service";
import { ModalSizeType, ModalPositionType } from "./modal.config";

@Component({
    selector: "sebng-modal",
    styleUrls: ["./modal.component.scss"],
    templateUrl: "./modal.component.html",
    encapsulation: ViewEncapsulation.None,
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
    onBackdropClick(event: MouseEvent) {
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
    onEscKey() {
        this.close();
    }

    open() {
        this.backDropRef = this.modalService.appendComponentToBody(SebModalBackdropComponent);
        this.modalService.open(this.modalRef);
    }

    close() {
        this.modalService.close(this.modalRef);
        this.modalService.removeComponentFromBody(this.backDropRef);
    }
}
