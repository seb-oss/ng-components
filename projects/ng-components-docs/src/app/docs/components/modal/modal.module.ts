import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from './examples/modal/modal.component';
import {ExampleWrapperComponent} from '../../../components/example-wrapper/example-wrapper.component';

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ExampleWrapperComponent,
    children: [
      { path: 'examples', component: ModalComponent },
      { path: 'api', component: ModalComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
