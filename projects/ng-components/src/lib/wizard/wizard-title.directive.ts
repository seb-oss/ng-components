import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[sebng-wizard-title]",
})
export class SebWizardTitleDirective {
    constructor(public template: TemplateRef<any>) {}
}
