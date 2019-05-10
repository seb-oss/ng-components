import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SebButtonModule, SebModalModule, SebDropdownModule} from '@sebgroup/ng-components';
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
    SebModalModule,
    SebDropdownModule
  ],
  entryComponents: [ExampleModal],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
