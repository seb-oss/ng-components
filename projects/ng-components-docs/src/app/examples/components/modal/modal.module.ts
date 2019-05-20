import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from './examples/modal/modal.component';
import {ExamplePageComponent} from '../../../components/example-page/example-page.component';
import {ExampleListComponent} from '../../../components/example-page/example-list/example-list.component';
import {ApiListComponent} from '../../../components/example-page/api-list/api-list.component';

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ExamplePageComponent,
    children: [
      { path: 'examples',
        component: ExampleListComponent,
        children: [{
          path: 'modal',
          component: ModalComponent,
          data: {
            title: 'Modal component',
            description: 'Additional description for example (optional)',
            sources: [{
              name: 'modal.component.html',
              // @ts-ignore
              src: require('!raw-loader!./examples/modal/modal.component.html'),
              lang: 'markup'
            }, {
              name: 'modal.component.ts',
              // @ts-ignore
              src: require('!raw-loader!./examples/modal/modal.component.ts'),
              lang: 'ts'
            }]
          }
        }]},
      { path: 'api', component: ApiListComponent, data: {
          source: require('!raw-loader!../../../../../../../lib/src/button/parse-source-example/parse-source-example.component.ts')
        }
      }
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
