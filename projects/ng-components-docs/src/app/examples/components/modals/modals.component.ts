import { Component, ViewChild } from "@angular/core";
import { ModalSizeType, ModalPositionType } from "lib/src/modal/modal.config";
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

    openModal(): void {
        this.modalChild.open();
    }

    openSizeModal(size: ModalSizeType): void {
        this.size = size;
        this.openModal();
    }

    openWithoutBackdrop(): void {
        this.backdropDismiss = false;
        this.openModal();
    }

    openCenteredModal(): void {
        this.center = true;
        this.openModal();
    }

    openFullscreen(): void {
        this.fullscreen = true;
        this.openModal();
    }

    openAside(position: ModalPositionType) {
        this.position = position;
        this.openModal();
    }

    closeModal(): void {
        this.modalChild.close();
        setTimeout(() => {
            this.resetModal();
        }, 500);
    }

    resetModal(): void {
        this.size = null;
        this.center = null;
        this.fullscreen = null;
        this.position = null;
        this.backdropDismiss = true;
    }
}
