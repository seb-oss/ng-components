import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleLoader } from './components/loader/example.loader';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { SebButtonModule, SebModalModule, SebDropdownModule, SebLoaderModule } from '@sebgroup/ng-components';
import { ExampleModal } from './components/example-modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExampleModal,
    ExampleLoader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    environment.production ?
      [] :
      [AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot()],
    SebButtonModule,
    SebModalModule,
    SebDropdownModule,
    SebLoaderModule,
    ReactiveFormsModule
  ],
  entryComponents: [ExampleModal],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
