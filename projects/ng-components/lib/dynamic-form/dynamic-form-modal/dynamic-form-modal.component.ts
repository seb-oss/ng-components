import { KeyValue } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { ExtendedFormControl } from "../model/custom-classes/extended-form-control";
import { ExtendedFormGroup, ExtendedFormGroupControl } from "../model/custom-classes/extended-form-group";

type ModalPosition = "left" | "right" | null;
type ModalSize = "lg" | "sm" | null;

@Component({
    selector: "app-dynamic-form-modal",
    templateUrl: "./dynamic-form-modal.component.html",
})
export class DynamicFormModalComponent {
    @Input() control: ExtendedFormGroupControl;
    @Input() controlIndex: number;
    @Input() modalToggle: boolean;
    @Input() form: ExtendedFormGroup;
    @Input() centered: boolean = false;
    @Input() position: ModalPosition = "right";
    @Input() size: ModalSize;

    @Output() saveControl: EventEmitter<any> = new EventEmitter();
    @Output() cancelControl: EventEmitter<any> = new EventEmitter();
    @Output() deleteControl: EventEmitter<any> = new EventEmitter();

    submitted: boolean = false;

    dismiss(): void {
        this.cancelControl.emit(this.control.value);
    }

    save(): void {
        this.form.updateValueAndValidity();
        this.submitted = true;
        if (this.form.valid) {
            this.saveControl.emit({ item: this.form, control: this.control.value });
        }
    }

    remove(): void {
        this.deleteControl.emit({ form: this.control.value, index: this.controlIndex });
    }

    orderForm = (
        a: KeyValue<string, ExtendedFormGroup | ExtendedFormControl>,
        b: KeyValue<string, ExtendedFormGroup | ExtendedFormControl>
    ): number => {
        if (a.value["sectionItem"] && b.value["sectionItem"]) {
            return (a.value as ExtendedFormGroup).sectionItem.order - (b.value as ExtendedFormGroup).sectionItem.order;
        } else if (a.value["formItem"] && b.value["formItem"]) {
            return (a.value as ExtendedFormControl).formItem.order - (b.value as ExtendedFormControl).formItem.order;
        }
        return 0;
    };

    controlValueChanged(): void {
        this.submitted &&= false;
    }
}
