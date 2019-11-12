import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[sebWizardStepLabel]' })
export class SebWizardStepLabelDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({ selector: '[sebWizardStepLabelDesc]' })
export class SebWizardStepLabelDescDirective {
  constructor(public template: TemplateRef<any>) {}
}
