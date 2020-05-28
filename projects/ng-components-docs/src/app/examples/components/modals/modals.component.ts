import { Component, ViewChild } from "@angular/core";
import { ModalSizeType, ModalPositionType } from "lib/src/modal/modal.type";
import { ModalComponent as MC } from "lib/src/modal/modal.component";

@Component({
    selector: "app-modal",
    templateUrl: "./modals.component.html",
    styleUrls: ["./modals.component.scss"],
})
export class ModalComponent {
    size: ModalSizeType;
    center: boolean;
    position: ModalPositionType;
    fullscreen: boolean;
    backdropDismiss: boolean = true;
    @ViewChild(MC) modalChild: MC;

    /**
     * open Modal
     */
    openModal(): void {
        this.modalChild.open();
    }

    /**
     * open modal with different possible sizes
     * @param size the size of the modal, can be small or large, not defining the size will open the modal with medium size
     */
    openSizeModal(size: ModalSizeType): void {
        this.size = size;
        this.openModal();
    }

    /**
     * open modal without backdrop dismiss
     */
    openWithoutBackdrop(): void {
        this.backdropDismiss = false;
        this.openModal();
    }

    /**
     * open centered modal
     */
    openCenteredModal(): void {
        this.center = true;
        this.openModal();
    }

    /**
     * open modal in fullscreen
     */
    openFullscreen(): void {
        this.fullscreen = true;
        this.openModal();
    }

    /**
     * open modal in the sides
     * @param position the side where the modal will be opened can be left or right
     */
    openAside(position: ModalPositionType) {
        this.position = position;
        this.openModal();
    }

    /**
     * close modal. and reset the inputs
     * here settimeout is used to avoid having weird animations while changing the inputs on the modal component
     */
    closeModal(): void {
        this.modalChild.close();
        setTimeout(() => {
            this.resetModal();
        }, 500);
    }

    /**
     * reset inputs of the modal component
     */
    resetModal(): void {
        this.size = this.center = this.fullscreen = this.position = this.backdropDismiss = null;
    }
}
