import { Injectable } from "@angular/core";
import { FormControl, ValidatorFn, Validators } from "@angular/forms";
import {
    DynamicFormItem,
    DynamicFormSection,
    DynamicFormResponseItem,
    DynamicFormType,
    formItemValidation,
    Rule,
    RuleType,
} from "./model/models";
import { ExtendedFormGroup, ExtendedFormGroupControls, ExtendedFormGroupControl } from "./model/custom-classes/extended-form-group";
import { ExtendedFormControl } from "./model/custom-classes/extended-form-control";
import { ExtendedFormArray } from "./model/custom-classes/extended-form-array";
import { ExtendedFormGroupArray } from "./model/custom-classes/extended-form-group-array";
import { KeyValue } from "@angular/common";

@Injectable()
export class FormService {
    constructor() {}

    dynamicFormSectionsToFormGroup(items: Array<DynamicFormSection>): ExtendedFormGroup {
        const controls: ExtendedFormGroupControls = {};
        const orderedItems = items.sort((a: DynamicFormSection, b: DynamicFormSection) => a.order - b.order);
        orderedItems.forEach((item: DynamicFormSection) => {
            if (!!item.multi) {
                const childControls: ExtendedFormGroupControls = this.dynamicFormItemsToControls(item.items);
                console.log(item);
                const formGroup: ExtendedFormGroup = new ExtendedFormGroup(childControls, item);
                const controlsArray: ExtendedFormGroup[] = [formGroup];
                controls[item.key] = new ExtendedFormGroupArray(controlsArray, item);
            } else {
                console.log(item);
                const childControls: ExtendedFormGroupControls = this.dynamicFormItemsToControls(item.items);
                controls[item.key] = new ExtendedFormGroup(childControls, item);
            }
        });
        return new ExtendedFormGroup(controls);
    }

    dynamicFormItemsToControls(items: Array<DynamicFormItem>): ExtendedFormGroupControls {
        const controls: ExtendedFormGroupControls = {};
        const orderedItems: Array<DynamicFormItem> = items.sort((a: DynamicFormItem, b: DynamicFormItem) => a.order - b.order);

        orderedItems.forEach((item: DynamicFormItem) => {
            const followUpItems = item.options?.find(option => option.followUpItems)?.followUpItems;
            if (followUpItems?.length) {
                console.log(this.dynamicFormItemsToFormGroup(followUpItems));
                controls[item.key] = this.dynamicFormItemsToFormGroup(followUpItems);
            } else {
                if (item.controlType === DynamicFormType.Text && item.multi) {
                    const controlsArray: FormControl[] = item.value
                        ? (item.value as Array<string>).map((val: string) => new FormControl(val))
                        : [new FormControl("")];
                    controls[item.key] = new ExtendedFormArray(item, controlsArray);
                } else {
                    controls[item.key] = new ExtendedFormControl(
                        item,
                        item.value,
                        this.generateControlValidator(this.generateValidations(item.rules))
                    );
                }
            }
        });
        console.log("controls", controls);
        return controls;
    }

    dynamicFormItemsToFormGroup(items: Array<DynamicFormItem>): ExtendedFormGroup {
        const controls: ExtendedFormGroupControls = this.dynamicFormItemsToControls(items);
        return new ExtendedFormGroup(controls);
    }

    formToDynamicFormResponseItems(
        data: KeyValue<string, any> | Array<KeyValue<string, any>>,
        formGroup: ExtendedFormGroup
    ): Array<DynamicFormResponseItem> {
        const dynamicFormSubmitValues: Array<DynamicFormResponseItem> = [];

        for (const section of Object.keys(data)) {
            const targetSection: ExtendedFormGroupControl = formGroup.get(section);
            if (targetSection) {
                if (targetSection instanceof ExtendedFormGroupArray) {
                    (targetSection as ExtendedFormGroupArray).controls.map((item: ExtendedFormGroup, sectionIndex: number) => {
                        for (const key of Object.keys(data[section][sectionIndex])) {
                            const target: ExtendedFormControl | ExtendedFormArray =
                                (item.get(key) as ExtendedFormControl | ExtendedFormArray) || null;
                            if (target) {
                                const { value, formItem }: ExtendedFormControl | ExtendedFormArray = target;
                                dynamicFormSubmitValues.push({
                                    key,
                                    formItem,
                                    value,
                                    sectionId: section,
                                    sectionIndex,
                                });
                            }
                        }
                    });
                } else {
                    for (const key of Object.keys(data[section])) {
                        const target: ExtendedFormControl | ExtendedFormArray =
                            (targetSection.get(key) as ExtendedFormControl | ExtendedFormArray) || null;
                        if (target) {
                            const { value, formItem }: ExtendedFormControl | ExtendedFormArray = target;
                            dynamicFormSubmitValues.push({ key, formItem, value, sectionId: section, sectionIndex: 0 });
                        }
                    }
                }
            }
        }

        return dynamicFormSubmitValues;
    }

    generateValidations(rules: Rule[]): { [key: string]: any } {
        let validations: { [key: string]: any } = {};
        rules
            ?.sort((a: Rule, b: Rule) => a.type - a.type)
            .forEach((rule: Rule) => {
                switch (rule.type) {
                    case RuleType.required:
                        validations = { ...validations, ...{ required: true } };
                        break;
                    case RuleType.min:
                        validations = { ...validations, ...{ min: rule.value } };
                        break;
                    case RuleType.max:
                        validations = { ...validations, ...{ max: rule.value } };
                        break;
                    case RuleType.maxLength:
                        validations = { ...validations, ...{ maxLength: rule.value } };
                        break;
                    case RuleType.minLength:
                        validations = { ...validations, ...{ minLength: rule.value } };
                        break;
                    case RuleType.pattern:
                        validations = { ...validations, ...{ pattern: rule.value } };
                        break;
                    default:
                        break;
                }
            });
        return validations;
    }

    generateControlValidator(validators: formItemValidation): ValidatorFn[] {
        const validations: ValidatorFn[] = [];
        Object.keys(validators).forEach((validator: string) => {
            switch (validator) {
                case "min":
                    validations.push(Validators.min(Number(validators[validator])));
                    break;
                case "max":
                    validations.push(Validators.max(Number(validators[validator])));
                    break;
                case "minLength":
                    validations.push(Validators.minLength(Number(validators[validator])));
                    break;
                case "maxLength":
                    validations.push(Validators.maxLength(Number(validators[validator])));
                    break;
                case "required":
                    validators.required && validations.push(Validators.required);
                    break;
                case "pattern":
                    validations.push(Validators.pattern(validators[validator]));
                    break;
                default:
                    break;
            }
        });
        return validations;
    }
}
