import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RadioGroupModule } from "./components/radio-group/radio-group.module";
import { ButtonsModule } from "./components/buttons/buttons.module";
import { ModalModule } from "./components/modal/modal.module";
import { DropdownModule } from "./components/dropdown/dropdown.module";
import { WizardModule } from "./components/wizard/wizard.module";
import { PaginationModule } from "./components/pagination/pagination.module";

@NgModule({
    declarations: [],
    imports: [CommonModule, RadioGroupModule, ButtonsModule, ModalModule, DropdownModule, WizardModule, PaginationModule],
})
export class ExamplesModule {}
