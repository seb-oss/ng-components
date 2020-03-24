import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SebWizardComponent } from "./wizard.component";
import { SebWizardTitleDirective } from "./wizard-title.directive";
import { SebWizardStepComponent } from "./wizard-step.component";
import { SebWizardStepLabelDescDirective, SebWizardStepLabelDirective } from "./wizard-step-label.directive";

@NgModule({
    imports: [CommonModule],
    declarations: [
        SebWizardComponent,
        SebWizardTitleDirective,
        SebWizardStepComponent,
        SebWizardStepLabelDirective,
        SebWizardStepLabelDescDirective,
    ],
    exports: [
        SebWizardComponent,
        SebWizardTitleDirective,
        SebWizardStepComponent,
        SebWizardStepLabelDirective,
        SebWizardStepLabelDescDirective,
    ],
})
export class SebWizardModule {}
