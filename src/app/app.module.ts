import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SebButtonModule, SebModalModule} from '@sebgroup/ng-components';
import {ExampleModal} from './components/example-modal';
import {SebModalModule} from '../../lib/src/modal';
import {SebButtonModule} from '../../lib/src/button';

@NgModule({
  declarations: [
    AppComponent,
    ExampleModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SebButtonModule,
    SebModalModule,
    SebModalModule,
    SebButtonModule
  ],
  entryComponents: [ExampleModal],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
