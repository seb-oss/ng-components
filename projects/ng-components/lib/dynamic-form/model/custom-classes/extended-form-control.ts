import { FormControl, AsyncValidatorFn, Validators, ValidatorFn } from "@angular/forms";
import { DynamicFormItem, Rule, RuleType, formItemValidation } from "../../model/dynamicFormItem";

export class ExtendedFormControl extends FormControl {
    formItem: DynamicFormItem;
    options: DynamicFormItem["options"] = [];

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
