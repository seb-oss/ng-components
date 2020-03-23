import { Directive, TemplateRef } from "@angular/core";

@Directive({ selector: "[sebng-wizard-step-label]" })
export class SebWizardStepLabelDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({ selector: "[sebng-wizard-step-label-desc]" })
export class SebWizardStepLabelDescDirective {
    constructor(public template: TemplateRef<any>) {}
}
