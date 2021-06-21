import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ExtendedFormArray } from "../model/custom-classes/extended-form-array";
import { ExtendedFormControl } from "../model/custom-classes/extended-form-control";
import { ExtendedFormGroupControl } from "../model/custom-classes/extended-form-group";

@Component({
    selector: "app-dynamic-form-data",
    templateUrl: "./dynamic-form-data.component.html",
})
export class DynamicFormDataComponent {
    @Input() control: ExtendedFormGroupControl;
    @Output() editControl: EventEmitter<any> = new EventEmitter();
    @Output() deleteControl: EventEmitter<any> = new EventEmitter();

    edit(formArray: ExtendedFormArray, index: number): void {
        this.editControl.emit({ formArray, index });
    }

    remove(form: ExtendedFormControl, index: number): void {
        this.deleteControl.emit({ form, index });
    }
}
