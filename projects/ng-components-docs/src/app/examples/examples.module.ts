import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonsModule } from "./components/buttons/buttons.module";
import { DropdownModule } from "./components/dropdown/dropdown.module";
import { WizardModule } from "./components/wizard/wizard.module";
import { PaginationModule } from "./components/pagination/pagination.module";
import { ModalModule } from "./components/modals/modals.module";

@NgModule({
    declarations: [],
    imports: [CommonModule, ButtonsModule, DropdownModule, WizardModule, PaginationModule, ModalModule],
})
export class ExamplesModule {}
