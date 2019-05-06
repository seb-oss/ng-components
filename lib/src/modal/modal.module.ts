import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SebModal} from './modal';
import {SebModalService} from './modal.service';
import {SebModalBackdrop} from './modal.backdrop';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SebModal,
    SebModalBackdrop
  ],
  exports: [],
  entryComponents: [
    SebModal,
    SebModalBackdrop
  ],
  providers: [
    SebModalService
  ]
})
export class SebModalModule { }
