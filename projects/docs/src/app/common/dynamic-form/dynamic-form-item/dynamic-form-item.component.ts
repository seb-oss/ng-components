import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ExtendedFormControl } from "../model/custom-classes/extended-form-control";
import { ExtendedFormArray } from "../model/custom-classes/extended-form-array";
import { DynamicFormType } from "../model/dynamicFormType";

@Component({
    selector: "app-dynamic-form-item",
    templateUrl: "./dynamic-form-item.component.html",
    styles: [
        `
            ::ng-deep .dynamic-form-item {
                margin-bottom: 1.5rem;
            }

            ::ng-deep .dynamic-form-item-description {
                margin-bottom: 0.5rem;
            }
        `,
    ],
})
export class DynamicFormItemComponent {
    @Input() control: ExtendedFormControl | ExtendedFormArray;
    @Input() submitted: boolean;
    @Input() sectionId: string;
    @Output() itemAddedClicked: EventEmitter<string> = new EventEmitter();
    @Output() itemRemovedClicked: EventEmitter<{ id: string; index: number }> = new EventEmitter();
    controlType = DynamicFormType;

    getFormArrayControls(control: ExtendedFormArray): ExtendedFormArray["controls"] {
        if (control instanceof ExtendedFormArray) {
            return control.controls;
        } else {
            console.warn("Error in getFormArrayControls: control is not an instance of ExtendedFormArray");
            return [];
        }
    }

    makeId(info: string, index?: number): string {
        return `${this.sectionId}-${this.control.formItem.key}-${this.control.formItem.controlType}${
            info ? `-${info}` : "" + index ? `-${index}` : ""
        }`;
    }
}
