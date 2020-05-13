import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RadioGroupModule } from "./components/radio-group/radio-group.module";
import { CheckboxGroupModule } from "./components/checkbox-group/checkbox-group.module";
import { ButtonsModule } from "./components/buttons/buttons.module";
import { ModalModule } from "./components/modal/modal.module";
import { DropdownModule } from "./components/dropdown/dropdown.module";
import { WizardModule } from "./components/wizard/wizard.module";
import { TextLabelModule } from "./components/textLabels/text-labels.module";
import { PaginationModule } from "./components/pagination/pagination.module";
import { TextAreaModule } from "./components/textArea/textArea.module";
import { TextboxGroupModule } from "./components/textboxGroup/textboxGroup.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RadioGroupModule,
        CheckboxGroupModule,
        ButtonsModule,
        ModalModule,
        DropdownModule,
        WizardModule,
        PaginationModule,
        TextAreaModule,
        TextboxGroupModule,
        TextLabelModule,
    ],
})
export class ExamplesModule {}
