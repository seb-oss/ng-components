import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  SebWizardStepLabelDescDirective,
  SebWizardStepLabelDirective,
} from './wizard-step-label.directive';

// Interface that reflects the properties that we need from AbstractControl so
// we don't have any import dependencies from '@angular/forms' package
export interface ISebWizardStepControl {
  valid: boolean;
  pending: boolean;
  reset(value?: any, options?: Object): void;
}

@Component({
  selector: 'div[seb-wizard-step], seb-wizard-step',
  templateUrl: 'wizard-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SebWizardStepComponent {
  @ContentChild(SebWizardStepLabelDirective, { static: true })
  wizardStepLabel: SebWizardStepLabelDirective;
  @ContentChild(SebWizardStepLabelDescDirective, { static: false })
  wizardStepLabelDesc: SebWizardStepLabelDescDirective;
  @ViewChild(TemplateRef, { static: true }) wizardStepContent: TemplateRef<any>;

  @Input() hideFromNavigation: boolean = false;
  @Input() stepControl: ISebWizardStepControl;

  @Input()
  get interacted(): boolean {
    return this._interacted;
  }
  set interacted(value: boolean) {
    this._interacted = `${value}` === 'true';
  }
  private _interacted: boolean = false;

  @Input()
  get completed(): boolean {
    return this._completed === null
      ? this.stepControl
        ? this.stepControl.valid && this.interacted
        : this.interacted
      : this._completed;
  }
  set completed(value: boolean) {
    this._completed = `${value}` === 'true';
  }
  private _completed: boolean | null = null;

  public reset(): void {
    this._interacted = false;
    this._completed = null;

    if (this.stepControl) {
      this.stepControl.reset();
    }
  }
}
