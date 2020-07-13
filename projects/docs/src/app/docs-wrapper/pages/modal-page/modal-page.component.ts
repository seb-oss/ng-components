import { Component, ViewChild } from "@angular/core";
import { ModalComponent } from "@sebgroup/ng-components/modal";
import { ModalSizeType, ModalPositionType } from "@sebgroup/ng-components/modal/modal.type";

@Component({
    selector: "app-modal-page",
    templateUrl: "./modal-page.component.html",
    styleUrls: ["./modal-page.component.scss"],
})
export class ModalPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/modal/modal.component");
    @ViewChild(ModalComponent) modalChild: ModalComponent;

    size: ModalSizeType;
    center: boolean;
    position: ModalPositionType;
    fullscreen: boolean;
    backdropDismiss: boolean = true;
    escapeDismiss: boolean = true;

    constructor() {
        document.title = "Modal - SEB Angular Components";
    }

    get hasImage(): boolean {
        return this.position && this.size === "modal-lg";
    }

    /**
     * open Modal
     */
    openModal(): void {
        this.modalChild.open();
    }

    /**
     * close modal
     */
    closeModal(): void {
        this.modalChild.close();
    }
}
