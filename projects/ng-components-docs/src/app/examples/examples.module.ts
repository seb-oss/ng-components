import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonsModule } from "./components/buttons/buttons.module";
import { ModalModule } from "./components/modal/modal.module";
import { DropdownModule } from "./components/dropdown/dropdown.module";
import { WizardModule } from "./components/wizard/wizard.module";
import { PaginationModule } from "./components/pagination/pagination.module";
import { TextboxGroupModule } from "./components/textboxGroup/textboxGroup.module";
@NgModule({
    declarations: [],
    imports: [CommonModule, ButtonsModule, ModalModule, DropdownModule, WizardModule, PaginationModule, TextboxGroupModule],
})
export class ExamplesModule {}
