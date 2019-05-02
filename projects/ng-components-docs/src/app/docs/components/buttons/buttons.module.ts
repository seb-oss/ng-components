import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleWrapperComponent } from '../../../components/example-wrapper/example-wrapper.component';
import { ButtonsComponent } from './examples/buttons/buttons.component';
import {ModalComponent} from '../modal/examples/modal/modal.component';
import {SebButtonModule} from '@sebgroup/ng-components';
import {ExamplePageComponent} from '../../../components/example-page/example-page.component';


const examples = [{
  title: 'Button directive',
  component: ButtonsComponent,
  sources: [{
    name: 'form.component.html',
    // @ts-ignore
    // src: require('!raw-loader!app/components/example-component/example-component.component.scss'),
    src: '<div class="foo">some snippet</div>',
    lang: 'markup'
  }, {
    name: 'form.component.ts',
    src: 'https://raw.githubusercontent.com/hjalmers/angular-markup-example/master/src/app/components/sources/form.component.ts',
    lang: 'typescript'
  }]
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
