import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";
import { ExtendedFormControl } from "../model/custom-classes/extended-form-control";
import { ExtendedFormArray } from "../model/custom-classes/extended-form-array";
import { DynamicFormType } from "../model/dynamicFormType";
import { isEmpty } from "@sebgroup/frontend-tools";
import { RuleType, Rule } from "../model/models";
import { FormService } from "../form.service";
import { ExtendedFormGroup, ExtendedFormGroupControl } from "../model/custom-classes/extended-form-group";

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
export class DynamicFormItemComponent implements OnInit {
    @Input() control: ExtendedFormControl | ExtendedFormArray;
    @Input() parentFormGroup: ExtendedFormGroup | ExtendedFormGroup[];
    @Input() sectionId: string;
    @Input() itemCustomClass: string = "";
    @Input() submitted: boolean = false;
    @Output() createFormGroup: EventEmitter<any> = new EventEmitter();
    @Output() itemAddedClicked: EventEmitter<string> = new EventEmitter();
    @Output() itemRemovedClicked: EventEmitter<{ id: string; index: number }> = new EventEmitter();
    @Output() controlValueChanged: EventEmitter<boolean> = new EventEmitter();
    controlType = DynamicFormType;

    constructor(private formService: FormService) {}

    ngOnInit(): void {
        this.control.valueChanges?.subscribe((valueChange: any) => {
            this.controlValueChanged.emit(true);

            const rule = this.control?.formItem?.rules?.find(
                (rule: Rule) =>
                    rule.type === RuleType.minThanReference ||
                    rule.type === RuleType.minThanEqualsReference ||
                    rule.type === RuleType.maxThanReference ||
                    rule.type === RuleType.maxThanEqualReference
            );

            if (rule && this.formService.findNestedControl(this.parentFormGroup, rule.value)) {
                const referenceControl: ExtendedFormGroupControl = this.formService.findNestedControl(this.parentFormGroup, rule.value);
                this.formService.appendValidations(this.control, rule, referenceControl);
            }
            if (valueChange?.followUpItems?.items?.length) {
                if (valueChange.followUpItems.type === "modal") {
                    delete (this.control as ExtendedFormControl).formGroup;
                    this.createFormGroup.emit(valueChange?.followUpItems?.items);
                } else {
                    (this.control as ExtendedFormControl).formGroup = this.formService.dynamicFormItemsToFormGroup(
                        valueChange?.followUpItems?.items
                    );
                }
            } else {
                delete (this.control as ExtendedFormControl).formGroup;
            }
        });
    }

    get formArrayControls(): ExtendedFormArray["controls"] {
        if (this.control instanceof ExtendedFormArray) {
            return this.control.controls;
        } else {
            console.warn("Error in getFormArrayControls: control is not an instance of ExtendedFormArray");
            return [];
        }
    }

    makeId(info?: string, index?: number): string {
        return `${this.sectionId}-${this.control.formItem.key}-${this.control.formItem.controlType}${
            info ? `-${info}` : "" + index ? `-${index}` : ""
        }`;
    }

    get error(): string {
        if (this.submitted && this.control?.errors && !isEmpty(this.control.errors)) {
            const errorObjKey: string = Object.keys(this.control.errors)[0];
            switch (errorObjKey) {
                case "min":
                    return this.control.formItem.rules.find(
                        (rule: Rule) =>
                            rule.type === RuleType.min ||
                            rule.type === RuleType.minThanEqualsReference ||
                            rule.type === RuleType.minThanReference
                    )?.message;
                case "max":
                    return this.control.formItem.rules.find(
                        (rule: Rule) =>
                            rule.type === RuleType.max ||
                            rule.type === RuleType.maxThanEqualReference ||
                            rule.type === RuleType.maxThanReference
                    )?.message;
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
