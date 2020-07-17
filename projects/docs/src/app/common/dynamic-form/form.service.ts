import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DynamicFormItem, DynamicFormSection, DynamicFormResponseItem, DynamicFormType } from "./model/models";
import { ExtendedFormGroup, ExtendedFormGroupControls, ExtendedFormGroupControl } from "./model/custom-classes/extended-form-group";
import { ExtendedFormControl } from "./model/custom-classes/extended-form-control";
import { ExtendedFormArray } from "./model/custom-classes/extended-form-array";
import { ExtendedFormGroupArray } from "./model/custom-classes/extended-form-group-array";

@Injectable()
export class FormService {
    constructor() {}

    dynamicFormSectionsToFormGroup(items: Array<DynamicFormSection>): ExtendedFormGroup {
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
            }
        });
        return new ExtendedFormGroup(controls);
    }

    dynamicFormItemsToControls(items: Array<DynamicFormItem>): ExtendedFormGroupControls {
        const controls: ExtendedFormGroupControls = {};
        const orderedItems = items.sort((a: DynamicFormItem, b: DynamicFormItem) => a.order - b.order);

        orderedItems.forEach((item: DynamicFormItem) => {
            if (item.controlType === DynamicFormType.Text && item.multi) {
                const controlsArray: FormControl[] = item.value
                    ? (item.value as Array<string>).map((val: string) => new FormControl(val))
                    : [new FormControl("")];
                controls[item.key] = new ExtendedFormArray(item, controlsArray);
            } else {
                controls[item.key] = new ExtendedFormControl(item, item.value);
            }
        });
        return controls;
    }

    dynamicFormItemsToFormGroup(items: Array<DynamicFormItem>): ExtendedFormGroup {
        const controls: ExtendedFormGroupControls = this.dynamicFormItemsToControls(items);
        return new ExtendedFormGroup(controls);
    }

    formToDynamicFormResponseItems(
        data: Array<{ [k: string]: { [k: string]: any } }> | { [k: string]: { [k: string]: any } },
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
}
