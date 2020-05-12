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

    openDialogue(): void {
        this.modalChild.open();
    }

    openSizeDialogue(size: ModalSizeType): void {
        this.size = size;
        this.openDialogue();
    }

    openWithoutBackdrop(): void {
        this.backdropDismiss = false;
        this.openDialogue();
    }

    openCenteredModal(): void {
        this.center = true;
        this.openDialogue();
    }

    openFullscreen(): void {
        this.fullscreen = true;
        this.openDialogue();
    }

    openAside(position: ModalPositionType) {
        this.position = position;
        this.openDialogue();
    }

    closeModal(): void {
        this.modalChild.close();
        this.resetModal();
    }

    resetModal(): void {
        this.size = null;
        this.center = null;
        this.fullscreen = null;
        this.position = null;
        this.backdropDismiss = true;
    }
}
