import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleWrapperComponent } from '../../../components/example-wrapper/example-wrapper.component';
import { ButtonsComponent } from './examples/buttons/buttons.component';
import {ModalComponent} from '../modal/examples/modal/modal.component';
import {SebButtonModule} from '@sebgroup/ng-components';
import {ExamplePageComponent} from '../../../components/example-page/example-page.component';

const examples = [{
  title: 'Button directive',
  component: ButtonsComponent
}, {
  title: 'Another button example',
  component: ModalComponent
}];

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ExampleWrapperComponent,
    children: [
      { path: 'examples', component: ExamplePageComponent, data: examples },
      { path: 'api', component: ModalComponent }
    ]
  }
];



@NgModule({
  declarations: [ButtonsComponent],
  imports: [
    CommonModule,
    SebButtonModule
  ]
})
export class ButtonsModule { }
