import { Component, OnInit } from '@angular/core';
import { SebModalService } from '../../../../../../../../../lib/src/modal';
import { WizardFormsComponent } from '../wizard-forms/wizard-forms.component';

@Component({
  templateUrl: 'wizard.component.html',
})
export class WizardComponent {
  constructor(private modal: SebModalService) {}

  public launchWizardForms() {
    this.modal.open(WizardFormsComponent, { type: 'fullscreen' });
  }
}
