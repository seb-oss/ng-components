import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RadioGroupModule } from "./components/radio-group/radio-group.module";
import { ButtonsModule } from "./components/buttons/buttons.module";
import { DropdownModule } from "./components/dropdown/dropdown.module";
import { WizardModule } from "./components/wizard/wizard.module";
import { TextLabelModule } from "./components/textLabels/text-labels.module";
import { PaginationModule } from "./components/pagination/pagination.module";
import { ModalModule } from "./components/modals/modals.module";
import { TextAreaModule } from "./components/textArea/textArea.module";
import { TextboxGroupModule } from "./components/textboxGroup/textboxGroup.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RadioGroupModule,
        ButtonsModule,
        ModalModule,
        DropdownModule,
        WizardModule,
        PaginationModule,
        TextAreaModule,
        TextboxGroupModule,
        TextLabelModule,
        ModalModule,
    ],
})
export class ExamplesModule {}
