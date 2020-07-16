import { Component } from "@angular/core";
import { DropdownItem } from "@sebgroup/ng-components/dropdown";

@Component({
    selector: "app-modal-page",
    templateUrl: "./modal-page.component.html",
})
export class ModalPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/modal/modal.component");

    center: boolean;
    fullscreen: boolean;
    backdropClassNameModel: boolean = false;
    backdropDismiss: boolean = true;
    backdropClassName: string;
    escapeDismiss: boolean = true;
    toggle: boolean = false;

    sizeItem: DropdownItem = { key: "", value: "", label: "default" };
    sizeList: Array<DropdownItem> = [
        this.sizeItem,
        { key: "modal-lg", value: "modal-lg", label: "modal-lg" },
        { key: "modal-sm", value: "modal-sm", label: "modal-sm" },
    ];
    positionItem: DropdownItem = { key: "", value: "", label: "default" };
    positionList: Array<DropdownItem> = [
        this.positionItem,
        { key: "right", value: "right", label: "right" },
        { key: "left", value: "left", label: "left" },
    ];
    code: string = `<sebng-modal
    [toggle]="toggle"
    (onDismiss)="closeModal()>

    <div class="custom-header" header>
        Title
    </div>

    <div class="custom-body" body>
        <ng-template #simpleBody>Body</ng-template>
    </div>

    <div class="custom-footer" footer>
        <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="closeModal()">
            Close
        </button>
    </div>
</sebng-modal>`;

    modalTemplate: string = `<sebng-modal>
    <div class="custom-header" header>
        Header
    </div>

    <div class="custom-body" body>
        body
    </div>

    <div class="custom-footer" footer>
        footer
    </div>
</sebng-modal>`;

    openModalSnippet: string = `toggle = true;`;

    closeModalSnippet: string = `toggle = false;`;

    closeModalHTML: string = `modalChild.close()`;

    constructor() {
        document.title = "Modal - SEB Angular Components";
    }

    get hasImage(): boolean {
        return this.position && this.sizeItem.value === "modal-lg";
    }

    get size(): string {
        return this.sizeItem.value;
    }

    get position(): string {
        return this.positionItem.value;
    }

    setBackdropClassName(): void {
        this.backdropClassName = this.backdropClassNameModel ? "bg-primary" : "";
    }

    /**
     * open Modal
     */
    openModal(): void {
        this.toggle = true;
    }

    /**
     * close modal
     */
    closeModal(): void {
        this.toggle = false;
    }
}
