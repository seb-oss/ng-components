import { Component } from "@angular/core";
import { ModalSize, ModalPosition } from "@sebgroup/ng-components/modal";
import { FormService } from "@common/dynamic-form/form.service";
import { ExtendedFormGroup } from "@common/dynamic-form/model/custom-classes/extended-form-group";
import { DynamicFormOption } from "@common/dynamic-form/model/models";

@Component({
    selector: "app-modal-page",
    templateUrl: "./modal-page.component.html",
    providers: [FormService],
})
export class ModalPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/modal/modal.component");
    snippet: string = `<sebng-modal
    [toggle]="toggle"
    (dismiss)="closeModal()>

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
    extendedFormGroup: ExtendedFormGroup;

    toggle: boolean = false;

    sizeList: DynamicFormOption<ModalSize>[] = [
        { key: "", value: null, label: "default" },
        { key: "lg", value: "lg", label: "lg" },
        { key: "sm", value: "sm", label: "sm" },
    ];
    positionList: DynamicFormOption<ModalPosition>[] = [
        { key: "", value: null, label: "default" },
        { key: "right", value: "right", label: "right" },
        { key: "left", value: "left", label: "left" },
    ];

    constructor(private formService: FormService) {
        document.title = "Modal - SEB Angular Components";

        this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
            {
                key: "controls",
                items: [
                    {
                        key: "size",
                        controlType: "Dropdown",
                        label: "Size:",
                        value: this.sizeList[0],
                        options: this.sizeList,
                    },
                    {
                        key: "position",
                        controlType: "Dropdown",
                        label: "Position:",
                        value: this.positionList[0],
                        options: this.positionList,
                    },
                    {
                        key: "centered",
                        controlType: "Checkbox",
                        label: "Centered",
                        description: "Positions the modal in the middle of the page. Only works with default position.",
                        value: false,
                    },
                    {
                        key: "fullscreen",
                        controlType: "Checkbox",
                        label: "Fullscreen",
                        value: false,
                    },
                    {
                        key: "disableBackdropDismiss",
                        controlType: "Checkbox",
                        label: "Disable backdrop dismiss",
                        value: false,
                    },
                    {
                        key: "escapeToDismiss",
                        controlType: "Checkbox",
                        label: "Escape to dismiss",
                        value: false,
                    },
                    {
                        key: "disableCloseButton",
                        controlType: "Checkbox",
                        label: "Disable close button",
                        value: false,
                    },
                ],
            },
        ]);
    }

    /** Only renders the image when the size is `lg` and the position is aside */
    get shouldRenderImage(): boolean {
        const position: ModalPosition = this.extendedFormGroup.value.controls.position.value;
        const size: ModalSize = this.extendedFormGroup.value.controls.size.value;

        return size === "lg" && ["right", "left"].some(p => p === position);
    }
}
