import { FormArray, FormControl } from "@angular/forms";
import { DynamicFormItem } from "../../model/dynamicFormItem";

export class ExtendedFormArray extends FormArray {
    formItem: DynamicFormItem;

    constructor(formItem: DynamicFormItem, controls: Array<FormControl>) {
        super(controls);
        this.formItem = formItem;
    }
}
