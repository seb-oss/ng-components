import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplePageComponent } from '../../../components/example-page/example-page.component';
import { LoaderComponent } from './examples/loader/loader.component';
import { InputSizeLoadersComponent } from './examples/input-size-loaders/input-size-loaders.component';
import { SebButtonModule } from '@sebgroup/ng-components';
import { SebLoaderModule } from '../../../../../../../lib/src/loader/loader.module';
import { ExampleListComponent } from '../../../components/example-page/example-list/example-list.component';
import { ApiListComponent } from '../../../components/example-page/api-list/api-list.component';
import { Route } from '@angular/router';

export const ROUTES: Array<Route> = [
    { path: '', pathMatch: 'full', redirectTo: 'examples' },
    {
        path: '',
        component: ExamplePageComponent,
        children: [
            {
                path: 'examples',
                component: ExampleListComponent,
                children: [{
                    path: 'loaders',
                    component: LoaderComponent,
                    data: {
                        title: 'Loader component',
                        description: 'A container size loader, non fullscreen',
                        sources: [{
                            name: 'loader.component.html',
                            src: require('!raw-loader!./examples/loader/loader.component.html'),
                            lang: 'markup'
                        }, {
                            name: 'loader.component.ts',
                            src: require('!raw-loader!./examples/loader/loader.component.ts'),
                            lang: 'ts'
                        }]
                    }
                }, {
                    path: 'input-loader-example',
                    component: InputSizeLoadersComponent,
                    data: {
                        title: 'Another example, button or input size loaders (same component)',
                        description: `Loaders can be of button or input sizes too like below`,
                        sources: [{
                            name: 'input-size-loaders.component.html',
                            src: require('!raw-loader!./examples/input-size-loaders/input-size-loaders.component.html'),
                            lang: 'markup'
                        }, {
                            name: 'Loader component',
                            src: require('!raw-loader!./examples/input-size-loaders/input-size-loaders.component.ts'),
                            lang: 'js'
                        }, {
                            name: 'input-size-loaders.css',
                            src: require('!raw-loader!./examples/input-size-loaders/input-size-loaders.component.scss'),
                            lang: 'css'
                        }]
                    }
                }]
            },
            {
                path: 'api',
                component: ApiListComponent,
                data: {
                    source: require('!raw-loader!../../../../../../../lib/src/loader/loader.component.ts')
                }
            }
        ]
    }
];


@NgModule({
    declarations: [LoaderComponent, InputSizeLoadersComponent],
    imports: [
        CommonModule,
        SebLoaderModule,
        SebButtonModule
    ]
})
export class LoadersModule { }
