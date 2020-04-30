import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonsModule } from "./components/buttons/buttons.module";
import { ModalModule } from "./components/modal/modal.module";
import { DropdownModule } from "./components/dropdown/dropdown.module";
import { WizardModule } from "./components/wizard/wizard.module";
import { TextLabelModule } from "./components/textLabels/text-labels.module";
import { PaginationModule } from "./components/pagination/pagination.module";

@NgModule({
    declarations: [],
    imports: [CommonModule, ButtonsModule, ModalModule, DropdownModule, WizardModule, PaginationModule, TextLabelModule],
})
export class ExamplesModule {}
