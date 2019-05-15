import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SebButtonModule, SebLoaderModule} from '@sebgroup/ng-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SebButtonModule,
    SebLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
