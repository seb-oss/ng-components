import {Component, Inject} from '@angular/core';
import {SebModalRef, SEB_MODAL_DATA} from '@sebgroup/ng-components';

@Component({
  template: '<h1>Example Modal</h1>{{data | json}}<button (click)="modal.close()">Close</button>'
})
export class ExampleModal {

  constructor(
    public modal: SebModalRef,
    @Inject(SEB_MODAL_DATA) public data: any) {
  }
}
