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

    dynamicFormSectionsToFormGroup(items: Array<DynamicFormSection>, original?: ExtendedFormGroup): ExtendedFormGroup {
        const controls: ExtendedFormGroupControls = {};
        const orderedItems = items.sort((a: DynamicFormSection, b: DynamicFormSection) => a.order - b.order);
        orderedItems.forEach((item: DynamicFormSection) => {
            if (!!item.multi) {
                const childControls: ExtendedFormGroupControls = this.dynamicFormItemsToControls(item.items);
                const formGroup: ExtendedFormGroup = new ExtendedFormGroup(childControls, item);
                const controlsArray: ExtendedFormGroup[] = [formGroup];
                controls[item.key] = new ExtendedFormGroupArray(controlsArray, item);
            } else {
                const childControls: ExtendedFormGroupControls = this.dynamicFormItemsToControls(item.items);
                controls[item.key] = new ExtendedFormGroup(childControls, item);
                if (original) {
                    original.controls[item.key] = new ExtendedFormGroup(childControls, item);
                }
            }
        });
        if (original) {
            return original;
        }
        return new ExtendedFormGroup(controls);
    }

    dynamicFormItemsToControls(items: Array<DynamicFormItem>): ExtendedFormGroupControls {
        const controls: ExtendedFormGroupControls = {};
        const orderedItems: Array<DynamicFormItem> = items?.sort((a: DynamicFormItem, b: DynamicFormItem) => a.order - b.order);

        orderedItems?.forEach((item: DynamicFormItem) => {
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
        });
        return controls;
    }

    dynamicFormItemsToFormGroup(items: Array<DynamicFormItem>): ExtendedFormGroup {
        const controls: ExtendedFormGroupControls = this.dynamicFormItemsToControls(items);
        return new ExtendedFormGroup(controls);
    }

    dynamicFormItemsToArrayFormGroup(items: Array<DynamicFormItem>): ExtendedFormGroupArray {
        const formGroup: ExtendedFormGroup = this.dynamicFormItemsToFormGroup(items);
        return new ExtendedFormGroupArray([formGroup]);
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
            ?.sort((a: Rule, b: Rule) => a.type - b.type)
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
                    case RuleType.minThanEqualsReference:
                        validations = { ...validations, ...{ min: rule.value } };
                        break;
                    case RuleType.minThanReference:
                        validations = { ...validations, ...{ min: rule.value } };
                        break;
                    case RuleType.maxThanReference:
                        validations = { ...validations, ...{ max: rule.value } };
                        break;
                    case RuleType.maxThanEqualReference:
                        validations = { ...validations, ...{ max: rule.value } };
                        break;
                    default:
                        break;
                }
            });
        return validations;
    }

    appendValidations(control: ExtendedFormGroupControl, rule: Rule, referenceControl: ExtendedFormGroupControl): void {
        let customRule: Rule;
        switch (rule.type) {
            case RuleType.maxThanReference:
                customRule = { ...rule, ...{ value: Number(referenceControl.value) - 1 } };
                break;
            case RuleType.maxThanEqualReference:
                customRule = { ...rule, ...{ value: referenceControl.value } };
                break;
            case RuleType.minThanReference:
                customRule = { ...rule, ...{ value: Number(referenceControl.value) + 1 } };
                break;
            case RuleType.minThanEqualsReference:
                customRule = { ...rule, ...{ value: referenceControl.value } };
                break;
            default:
                break;
        }
        control.setValidators(this.generateControlValidator(this.generateValidations([customRule])));
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

    isNestedFormInvalid(form: ExtendedFormGroup): boolean {
        return Object.keys(form.controls).some((key: string) => {
            const formControl: ExtendedFormGroup = form.controls[key] as ExtendedFormGroup;

            return Object.keys(formControl.controls).some((childControlKey: string) => {
                if (formControl.controls[childControlKey]?.valid) {
                    const formGroup: ExtendedFormGroup = (formControl.controls[childControlKey] as ExtendedFormControl)
                        ?.formGroup as ExtendedFormGroup;
                    if (formGroup && !formGroup.valid) {
                        return true;
                    }
                } else {
                    return true;
                }
            });
        });
    }

    findNestedControl(forms: ExtendedFormGroup | ExtendedFormGroup[], controlKey: string): ExtendedFormGroupControl {
        let existingControl: ExtendedFormGroupControl;

        if (Array.isArray(forms)) {
            forms.some((form: ExtendedFormGroup) => {
                this.findNestedControl(form, controlKey);
            });
        } else {
            if (forms.controls[controlKey]) {
                existingControl = forms.controls[controlKey] as ExtendedFormGroupControl;
            } else {
                Object.keys(forms.controls).forEach((key: string) => {
                    if ((forms.controls[key] as ExtendedFormGroup).controls) {
                        if ((forms.controls[key] as ExtendedFormGroup).controls[controlKey]) {
                            existingControl = (forms.controls[key] as ExtendedFormGroup).controls[controlKey] as ExtendedFormGroupControl;
                        } else {
                            Object.keys((forms.controls[key] as ExtendedFormGroup).controls).forEach((control: string) => {
                                (forms.controls[key] as ExtendedFormGroup).controls[control];
                                if (((forms.controls[key] as ExtendedFormGroup).controls[control] as ExtendedFormControl).formGroup) {
                                    if (
                                        ((forms.controls[key] as ExtendedFormGroup).controls[control] as ExtendedFormControl).formGroup
                                            .controls[controlKey]
                                    ) {
                                        existingControl = (
                                            (forms.controls[key] as ExtendedFormGroup).controls[control] as ExtendedFormControl
                                        ).formGroup.controls[controlKey];
                                    }
                                }
                            });
                        }
                    }
                    if ((forms.controls[key] as ExtendedFormControl).formGroup) {
                        if ((forms.controls[key] as ExtendedFormControl).formGroup.controls[controlKey]) {
                            existingControl = (forms.controls[key] as ExtendedFormControl).formGroup.controls[controlKey];
                        }
                    }
                });
            }
        }

        return existingControl;
    }

    validateForm(form: ExtendedFormGroup): boolean {
        form.updateValueAndValidity();
        if (!form.valid) {
            return form.valid;
        } else {
            return !this.isNestedFormInvalid(form);
        }
    }
}
