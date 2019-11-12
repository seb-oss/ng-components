import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[sebWizardTitle]'
})
export class SebWizardTitleDirective {
  constructor(public template: TemplateRef<any>) { }
}
