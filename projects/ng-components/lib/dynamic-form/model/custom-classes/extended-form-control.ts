import { FormControl, AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { DynamicFormItem } from "../../model/dynamicFormItem";
import { ExtendedFormGroup } from "./extended-form-group";
import { ExtendedFormGroupArray } from "./extended-form-group-array";

export class ExtendedFormControl extends FormControl {
    formItem: DynamicFormItem;
    options: DynamicFormItem["options"] = [];
    formGroup: ExtendedFormGroup | ExtendedFormGroupArray;

    constructor(
        formItem: DynamicFormItem,
        value: any,
        validator?: ValidatorFn | ValidatorFn[] | AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(value, validator);
        this.formItem = formItem;
        this.options = formItem.options ? formItem.options : null;
    }
}
