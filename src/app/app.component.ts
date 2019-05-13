import {Component} from '@angular/core';
import {SebModalService, SebModalType, SebModalRef} from '@sebgroup/ng-components';
import {ExampleModal} from './components/example-modal';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-components';

  public dropdownForm: FormGroup;

  public fruits = [
    {name: 'Banana', color: 'yellow'},
    {name: 'Apple', color: 'red'},
    {name: 'Pear', color: 'green'}
    ];


  public selected: any;

  constructor(private modal: SebModalService, private formBuilder: FormBuilder) {

    this.dropdownForm = this.formBuilder.group({
      single: new FormControl(null),
      multi: new FormControl(null),
      preMulti: new FormControl(this.fruits)
    });

    this.dropdownForm.valueChanges.subscribe(changes => console.log(changes));

  }

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


  handleOnSelectionChange(fruit) {
    this.selected = fruit;
  }


}
