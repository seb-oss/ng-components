import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SebButtonModule, SebModalModule, SebDropdownModule} from '@sebgroup/ng-components';
import {ExampleModal} from './components/example-modal';
import {ReactiveFormsModule} from '@angular/forms';

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
    SebDropdownModule,
    ReactiveFormsModule
  ],
  entryComponents: [ExampleModal],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
