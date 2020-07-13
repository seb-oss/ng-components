import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalComponent } from "@sebgroup/ng-components/modal";

@Component({
    selector: "app-modal-page",
    templateUrl: "./modal-page.component.html",
})
export class ModalPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/modal/modal.component");
    @ViewChild(ModalComponent) modalChild: ModalComponent;

    constructor() {
        document.title = "Modal - SEB Angular Components";
    }

    ngOnInit(): void {}

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
