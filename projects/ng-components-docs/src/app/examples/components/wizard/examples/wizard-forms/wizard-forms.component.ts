import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'wizard-forms.component.html',
})
export class WizardFormsComponent implements OnInit {
  public wizardFormGroup: FormGroup;

  constructor() {
    this.wizardFormGroup = new FormGroup({
      step1: new FormGroup({
        name: new FormControl('', Validators.required),
      }),
      step2: new FormGroup({
        address: new FormControl('', Validators.required),
      }),
      step3: new FormGroup({
        age: new FormControl('', Validators.required),
      }),
      step4: new FormGroup({
        confirm: new FormControl('', Validators.required),
      }),
    });
  }

  ngOnInit() {}
}
