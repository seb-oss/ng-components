import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { KeyValue } from "@angular/common";
import { DynamicFormItem, DynamicFormType, DynamicFormOption } from "./model/models";
import { ExtendedFormGroup, ExtendedFormGroupControls } from "./model/custom-classes/extended-form-group";
import { ExtendedFormControl } from "./model/custom-classes/extended-form-control";
import { ExtendedFormArray } from "./model/custom-classes/extended-form-array";
import { ExtendedFormGroupArray } from "./model/custom-classes/extended-form-group-array";
import { FormService } from "./form.service";

interface DynamicFormValidationError {
    key: string;
    errorMessage: string;
    sectionId: string;
    sectionIndex: number;
    formItem: Partial<DynamicFormItem>;
}

@Component({
    selector: "app-dynamic-form",
    templateUrl: "./dynamic-form.component.html",
    providers: [FormService],
})
export class DynamicFormComponent {
    @Input() extendedFormGroup: ExtendedFormGroup;
    @Input() validationErrors: DynamicFormValidationError[];

    constructor(private formService: FormService) {}

    /**
     * SHOULD RENDER CONTROL:
     * Determines if the form control should be rendered or not.
     * @param key section key
     * @param formItem the target form item that should or should not be displayed
     * @param index if the formgroup is an array this is the index of the formgroup item
     */
    shouldRenderControl(key: string, formItem: DynamicFormItem, index?: number): boolean {
        // console.log("should render key: ", key, " item: ", formItem, index ? ` index: ${index}` : "");
        if (formItem.rulerKey) {
            // It has a ruler key, trying to find the ruler and it's value
            let ruler: ExtendedFormControl;
            if (index > -1) {
                // the form control where the ruler should be is an array
                const target: ExtendedFormControl = (this.extendedFormGroup.get(key) as ExtendedFormGroupArray)
                    .at(index)
                    .get(formItem.rulerKey) as ExtendedFormControl;
                if (target) {
                    ruler = target;
                }
            } else {
                // no array index: the form control where the ruler should be is a regular form
                ruler = this.extendedFormGroup.get(key).get(formItem.rulerKey) as ExtendedFormControl;
            }
            const rulerValue: any = ruler.value;
            const { condition } = formItem;
            if (rulerValue === undefined || condition === undefined) {
                console.warn("Something went wrong in shouldRenderControl: Ruler value or condition could not be found.");
                return false;
            }
            if (typeof rulerValue === "string" && rulerValue === (condition as any)) {
                return this.shouldRenderControl(key, ruler.formItem, index);
            } else if (rulerValue && condition && typeof condition === "object" && Array.isArray(condition)) {
                for (const conditionItem of condition as Array<any>) {
                    if (conditionItem) {
                        if (typeof rulerValue === "object" && Array.isArray(rulerValue)) {
                            for (const rulerValueItem of rulerValue as Array<any>) {
                                if (
                                    rulerValueItem &&
                                    rulerValueItem.value === conditionItem.value &&
                                    rulerValueItem.key === conditionItem.key
                                ) {
                                    return this.shouldRenderControl(key, ruler.formItem, index);
                                }
                            }
                        } else if (typeof rulerValue === "object" && !Array.isArray(rulerValue)) {
                            if (rulerValue && rulerValue.value === conditionItem.value && rulerValue.key === conditionItem.key) {
                                return this.shouldRenderControl(key, ruler.formItem, index);
                            }
                        }
                    }
                }
            } else if (
                rulerValue &&
                typeof rulerValue === "object" &&
                !Array.isArray(rulerValue) &&
                rulerValue.value === (condition as DynamicFormOption).value
            ) {
                return this.shouldRenderControl(key, ruler.formItem, index);
            } else if (rulerValue && typeof rulerValue === "boolean" && rulerValue === condition) {
                return this.shouldRenderControl(key, ruler.formItem, index);
            }
            return false;
        }
        return true;
    }

    /**
     * ADD NEW ITEM TO FORM ARRAY WITH ID:
     * Duplicates the whole section or a form item within a section
     * @param key section key
     * @param id the id of the form item which should be duplicated
     * @param sectionIndex if the formgroup is an array this is the index of the formgroup item
     */
    addNewItemToFormArrayWithId(key: string, id?: string, sectionIndex?: number) {
        if (id) {
            // There is an id which means we want to duplicate a form item within a section
            if (sectionIndex > -1) {
                // the form control where the item to duplicate should be is an array
                const target: ExtendedFormArray = (this.extendedFormGroup.get(key) as ExtendedFormGroupArray).at(
                    sectionIndex
                ) as ExtendedFormArray;
                (target.get(id) as ExtendedFormArray).push(new FormControl(""));
            } else {
                // the form control is not an array since there is no section index
                (this.extendedFormGroup.get(key).get(id) as ExtendedFormArray).push(new FormControl(""));
            }
        } else {
            // There is no id which means we want to duplicate the entire section
            const target: ExtendedFormGroupArray = this.extendedFormGroup.get(key) as ExtendedFormGroupArray;
            const childControls: ExtendedFormGroupControls = this.formService.dynamicFormItemsToControls(target.sectionItem.items);
            const formGroup: ExtendedFormGroup = new ExtendedFormGroup(childControls, target.sectionItem);
            target.push(formGroup);
        }
    }

    /**
     * REMOVE ITEM AT INDEX FROM FORM ARRAY WITH ID:
     * Removes the whole section or a form item within a section
     * @param key section key
     * @param info the id of the form item which should be removed and the index of where to remove it
     * @param sectionIndex if the formgroup is an array this is the index of the formgroup item
     */
    removeItemAtIndexFromFormArrayWithId(key: string, info?: { id: string; index: number }, sectionIndex?: number) {
        if (info && info.id) {
            // There is info which means we want to remove a form item within a section
            if (sectionIndex > -1) {
                // the form control where the item to remove should be is an array
                const target: ExtendedFormArray = (this.extendedFormGroup.get(key) as ExtendedFormGroupArray).at(
                    sectionIndex
                ) as ExtendedFormArray;
                (target.get(info.id) as ExtendedFormArray).removeAt(info.index);
            } else {
                // the form control is not an array since there is no section index
                (this.extendedFormGroup.get(key).get(info.id) as ExtendedFormArray).removeAt(info.index);
            }
        } else {
            // there is no info indicating we should use the section index to remove the section itself
            if (sectionIndex > -1) {
                (this.extendedFormGroup.get(key) as ExtendedFormGroupArray).removeAt(sectionIndex);
            } else {
                console.warn("Error at removeItemAtIndexFromFormArrayWithId: Tried to remove section but no section index was provided");
            }
        }
    }

    orderForm = (
        a: KeyValue<number, ExtendedFormGroup | ExtendedFormControl>,
        b: KeyValue<number, ExtendedFormGroup | ExtendedFormControl>
    ): number => {
        if (a.value["sectionItem"] && b.value["sectionItem"]) {
            return (a.value as ExtendedFormGroup).sectionItem.order - (b.value as ExtendedFormGroup).sectionItem.order;
        } else if (a.value["formItem"] && b.value["formItem"]) {
            return (a.value as ExtendedFormControl).formItem.order - (b.value as ExtendedFormControl).formItem.order;
        }
        return 0;
    };

    getFormArrayControls(control: ExtendedFormGroupArray): Array<ExtendedFormGroup> {
        if (control instanceof ExtendedFormGroupArray) {
            return control.controls as Array<ExtendedFormGroup>;
        } else {
            console.warn("Error in getFormArrayControls: control is not an instance of ExtendedFormGroupArray");
            return [];
        }
    }

    getValidationErrorFor = (key: string, formItem: DynamicFormItem, index?: number): string => {
        let errorMessage: string;
        if (!this.validationErrors || (this.validationErrors && !this.validationErrors.length)) {
            return null;
        }

        let sectionErrors: DynamicFormValidationError[];
        if (index) {
            // check for sectionIndex
            sectionErrors = this.validationErrors.filter(error => error.sectionId === key && error.sectionIndex === index);
        } else {
            sectionErrors = this.validationErrors.filter(error => error.sectionId === key);
        }

        if (sectionErrors && sectionErrors.length) {
            sectionErrors.forEach(error => {
                if (error.key === formItem.key) {
                    errorMessage = error.errorMessage;
                }
            });
        }
        return errorMessage;
    };
}
