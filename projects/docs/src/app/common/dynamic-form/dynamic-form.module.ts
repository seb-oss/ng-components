import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// CUSTOM COMPONENTS =========================
import { DynamicFormComponent } from "./dynamic-form.component";
import { DynamicFormItemComponent } from "./dynamic-form-item/dynamic-form-item.component";

import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";
import { RadioGroupModule } from "@sebgroup/ng-components/radio-group";
import { TextboxGroupModule } from "@sebgroup/ng-components/textboxGroup";
import { DatepickerModule } from "@sebgroup/ng-components/datepicker";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { TextareaModule } from "@sebgroup/ng-components/textarea";
import { StepperModule } from "@sebgroup/ng-components/stepper";

@NgModule({
    declarations: [DynamicFormComponent, DynamicFormItemComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        CheckBoxModule,
        RadioGroupModule,
        TextboxGroupModule,
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
        CheckBoxModule,
        RadioGroupModule,
        TextboxGroupModule,
        TextareaModule,
        DatepickerModule,
        StepperModule,
    ],
    bootstrap: [DynamicFormItemComponent],
})
export class DynamicFormModule {}
