import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './examples/tooltip/tooltip.component';
import { ExamplePageComponent } from '../../../components/example-page/example-page.component';
import { ExampleListComponent } from '../../../components/example-page/example-list/example-list.component';
import { ApiListComponent } from '../../../components/example-page/api-list/api-list.component';
import { SebTooltipModule } from 'lib/src/tooltip';

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ExamplePageComponent,
    children: [
      {
        path: 'examples',
        component: ExampleListComponent,
        children: [
          {
            path: 'tooltip',
            component: TooltipComponent,
            data: {
              title: 'Tooltip component',
              description: 'Additional description for example (optional)',
              sources: [
                {
                  name: 'tooltip.component.html',
                  // @ts-ignore
                  src: require('!raw-loader!./examples/tooltip/tooltip.component.html'),
                  lang: 'markup',
                },
                {
                  name: 'tooltip.component.ts',
                  // @ts-ignore
                  src: require('!raw-loader!./examples/tooltip/tooltip.component.ts'),
                  lang: 'ts',
                },
              ],
            },
          },
        ],
      },
      {
        path: 'api',
        component: ApiListComponent,
        data: {
          sources: [
            require('!raw-loader!../../../../../../../lib/src/button/parse-source-example/parse-source-example.component.ts'),
            require('!raw-loader!../../../../../../../lib/src/tooltip/tooltip.ts'),
            // require('!raw-loader!../../../../../../../lib/src/tooltip/tooltip.directives.ts'),
            // require('!raw-loader!../../../../../../../src/app/components/tooltip/tooltip.service.ts'),
          ],
        },
      },
    ],
  },
];

@NgModule({
  declarations: [TooltipComponent],
  imports: [CommonModule, SebTooltipModule],
})
export class TooltipModule {}
