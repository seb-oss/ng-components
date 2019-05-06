import { Component } from '@angular/core';
import {SebModalService, SebModalType} from '@sebgroup/ng-components';
import {ExampleModal} from './components/example-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-components';

  constructor(private modal: SebModalService) { }

  openModal(type: SebModalType = null) {
    this.modal.open(ExampleModal, {type: type, data: {test: 'test'}});
  }


}
