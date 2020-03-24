import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from './components/buttons/buttons.module';
import { ModalModule } from './components/modal/modal.module';
import { WizardModule } from './components/wizard/wizard.module';
import { DropdownModule } from './components/dropdown/dropdown.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonsModule,
    ModalModule,
    WizardModule,
    DropdownModule,
  ],
})
export class ExamplesModule {}
