import {Component, Inject} from '@angular/core';
import {SebModalRef, SEB_MODAL_DATA} from '@sebgroup/ng-components';

@Component({
  templateUrl: 'example.modal.html'
})
export class ExampleModal {

  constructor(
    public modal: SebModalRef,
    @Inject(SEB_MODAL_DATA) public data: any) {
  }
}
