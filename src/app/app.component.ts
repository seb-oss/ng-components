import {Component} from '@angular/core';
import {SebModalService, SebModalType, SebModalRef} from '@sebgroup/ng-components';
import {ExampleModal} from './components/example-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-components';

  constructor(private modal: SebModalService) { }

  openModal(type: SebModalType = null, closable: boolean = true) {
    const modal: SebModalRef = this.modal.open(ExampleModal, {type: type, closable, data: {
      id: 1234,
      property: 'Something dynamic'
    }});
    modal.onClose$
      .subscribe(reason => {
        if (reason) {alert(reason); }
      });
  }
}
