import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from './components/buttons/buttons.module';
import { ModalModule } from './components/modal/modal.module';
import { LoadersModule } from './components/loaders/loader.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonsModule,
    ModalModule,
    LoadersModule
  ]
})
export class ExamplesModule { }
