import { FormControl, AsyncValidatorFn, Validators } from "@angular/forms";
import { DynamicFormItem } from "../../model/dynamicFormItem";

export class ExtendedFormControl extends FormControl {
    formItem: DynamicFormItem;
    options: DynamicFormItem["options"] = [];

    constructor(formItem: DynamicFormItem, value: any, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(value, formItem.required ? Validators.required : null, asyncValidator);
        this.formItem = formItem;
        this.options = formItem.options ? formItem.options : null;
    }
}
