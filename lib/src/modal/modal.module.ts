import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SebModal} from './modal';
import {SebModalService} from './modal.service';
import {SebModalBackdrop} from './modal.backdrop';
import {SebModalBody, SebModalFooter, SebModalHeader, SebModalTitle} from './modal.directives';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SebModal,
    SebModalBackdrop,
    SebModalTitle,
    SebModalHeader,
    SebModalBody,
    SebModalFooter
  ],
  exports: [
    SebModalTitle,
    SebModalHeader,
    SebModalBody,
    SebModalFooter
  ],
  entryComponents: [
    SebModal,
    SebModalBackdrop
  ],
  providers: [
    SebModalService
  ]
})
export class SebModalModule { }
