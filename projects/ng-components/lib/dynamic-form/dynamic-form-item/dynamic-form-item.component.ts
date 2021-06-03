import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ExtendedFormControl } from "../model/custom-classes/extended-form-control";
import { ExtendedFormArray } from "../model/custom-classes/extended-form-array";
import { DynamicFormType } from "../model/dynamicFormType";
import { isEmpty } from "@sebgroup/frontend-tools";
import { RuleType, Rule } from "../model/models";

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

    get error(): string {
        if (this.control?.errors && !isEmpty(this.control.errors)) {
            const errorObjKey: string = Object.keys(this.control.errors)[0];
            switch (errorObjKey) {
                case "min":
                    return this.control.formItem.rules.find((rule: Rule) => rule.type === RuleType.min)?.message;
                case "max":
                    return this.control.formItem.rules.find((rule: Rule) => rule.type === RuleType.max)?.message;
                case "minlength":
                    return this.control.formItem.rules.find((rule: Rule) => rule.type === RuleType.minLength)?.message;
                case "maxlength":
                    return this.control.formItem.rules.find((rule: Rule) => rule.type === RuleType.maxLength)?.message;
                case "required":
                    return this.control.formItem.rules.find((rule: Rule) => rule.type === RuleType.required)?.message;
                default:
                    break;
            }
        }
        return "";
    }
}
