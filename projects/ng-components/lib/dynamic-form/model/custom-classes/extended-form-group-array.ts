import { FormArray } from "@angular/forms";
import { DynamicFormSection } from "../../model/dynamicFormSection";
import { ExtendedFormGroup } from "./extended-form-group";

export class ExtendedFormGroupArray extends FormArray {
    sectionItem: DynamicFormSection;

    constructor(controls: Array<ExtendedFormGroup>, item?: DynamicFormSection) {
        super(controls);
        this.sectionItem = item;
    }
}
