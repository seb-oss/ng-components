import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// CUSTOM COMPONENTS =========================
import { DynamicFormComponent } from "./dynamic-form.component";
import { DynamicFormItemComponent } from "./dynamic-form-item/dynamic-form-item.component";

import { CheckboxModule } from "../checkbox";
import { RadioGroupModule } from "../radio-group";
import { TextboxModule } from "../textbox";
import { DatepickerModule } from "../datepicker";
import { DropdownModule } from "../dropdown";
import { TextareaModule } from "../textarea";
import { StepperModule } from "../stepper";

@NgModule({
    declarations: [DynamicFormComponent, DynamicFormItemComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        CheckboxModule,
        RadioGroupModule,
        TextboxModule,
        TextareaModule,
        DatepickerModule,
        StepperModule,
    ],
    exports: [
        // COMPONENTS
        DynamicFormComponent,
        DynamicFormItemComponent,
        // MODULES
        DropdownModule,
        CheckboxModule,
        RadioGroupModule,
        TextareaModule,
        DatepickerModule,
        StepperModule,
    ],
    bootstrap: [DynamicFormItemComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DynamicFormModule {}
