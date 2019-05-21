import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SebButtonModule} from '@sebgroup/ng-components';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import {SebButtonModule, SebModalModule} from '@sebgroup/ng-components';
import {ExampleModal} from './components/example-modal';

@NgModule({
  declarations: [
    AppComponent,
    ExampleModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SebButtonModule,
    environment.production ?
        [] :
        [ AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot() ]
    SebButtonModule,
    SebModalModule
  ],
  entryComponents: [ExampleModal],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
