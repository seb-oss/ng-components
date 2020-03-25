import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RadioGroupModule } from "./components/radio-group/radio-group.module";
import { ButtonsModule } from "./components/buttons/buttons.module";
import { ModalModule } from "./components/modal/modal.module";
import { WizardModule } from "./components/wizard/wizard.module";

@NgModule({
    declarations: [],
    imports: [CommonModule, RadioGroupModule, ButtonsModule, ModalModule, WizardModule],
})
export class ExamplesModule {}
