import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// CUSTOM COMPONENTS =========================
import { DynamicFormComponent } from "./dynamic-form.component";
import { DynamicFormItemComponent } from "./dynamic-form-item/dynamic-form-item.component";

import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";
import { RadioGroupModule } from "@sebgroup/ng-components/radio-group";
import { TextboxGroupModule } from "@sebgroup/ng-components/textboxGroup";
import { DatePickerModule } from "@sebgroup/ng-components/datePicker";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { TextAreaModule } from "@sebgroup/ng-components/textarea";

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
        TextAreaModule,
        DatePickerModule,
        DatePickerModule,
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
        TextAreaModule,
        DatePickerModule,
        DatePickerModule,
    ],
    bootstrap: [DynamicFormItemComponent],
})
export class DynamicFormModule {}
