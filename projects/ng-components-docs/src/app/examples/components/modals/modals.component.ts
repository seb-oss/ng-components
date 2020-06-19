import { Component, ViewChild } from "@angular/core";
import { ModalSizeType, ModalPositionType } from "lib/src/modal/modal.type";
import { ModalComponent as MC } from "lib/src/modal/modal.component";
type modalInputs = {
    size?: ModalSizeType;
    position?: ModalPositionType;
    center?: boolean;
    fullscreen?: boolean;
    backdropDismiss?: boolean;
    escapeDismiss?: boolean;
};

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
    escapeDismiss: boolean = true;
    @ViewChild(MC) modalChild: MC;

    /**
     * open Modal with different possibilities
     * All inputs have a default value, so calling this function will open the modal in default mode
     */
    openModal({
        size = null,
        position = null,
        center = false,
        fullscreen = false,
        backdropDismiss = true,
        escapeDismiss = true,
    }: modalInputs): void {
        this.size = size;
        this.center = center;
        this.position = position;
        this.fullscreen = fullscreen;
        this.backdropDismiss = backdropDismiss;
        this.escapeDismiss = escapeDismiss;
        this.modalChild.open();
    }

    /**
     * close modal
     */
    closeModal(): void {
        this.modalChild.close();
    }
}
