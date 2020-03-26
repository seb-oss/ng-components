import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonsModule } from "./components/buttons/buttons.module";
import { ModalModule } from "./components/modal/modal.module";
import { WizardModule } from "./components/wizard/wizard.module";
import { TextLabelModule } from "./components/textLabels/text-labels.module";

@NgModule({
    declarations: [],
    imports: [CommonModule, ButtonsModule, ModalModule, WizardModule, TextLabelModule],
})
export class ExamplesModule {}
