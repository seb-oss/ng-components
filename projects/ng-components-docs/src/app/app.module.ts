import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SideMenuComponent } from './components/menu/side-menu.component';
import { ExamplePageComponent } from './components/example-page/example-page.component';
import { ExamplesModule } from './examples/examples.module';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faList } from '@fortawesome/pro-light-svg-icons/faList';
import { LogoComponent } from './components/logo/logo.component';
import { faBars } from '@fortawesome/pro-light-svg-icons/faBars';
import { ExampleListComponent } from './components/example-page/example-list/example-list.component';
import {
  ExampleTemplateComponent,
  CodeExampleDirective} from './components/example-page/example-list/example-template/example-template.component';
import {faCode} from '@fortawesome/pro-light-svg-icons/faCode';
import { faHome } from '@fortawesome/pro-light-svg-icons/faHome';
import { faCubes } from '@fortawesome/pro-light-svg-icons/faCubes';
import { ExemplifyModule } from 'angular-exemplify';
import { ApiListComponent } from './components/example-page/api-list/api-list.component';
import { faExpandWide } from '@fortawesome/pro-light-svg-icons/faExpandWide';
import { InstallationComponent } from './components/installation/installation.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    ExamplePageComponent,
    HeaderComponent,
    LogoComponent,
    ExampleListComponent,
    CodeExampleDirective,
    ExampleTemplateComponent,
    ApiListComponent,
    InstallationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ExemplifyModule,
    ExamplesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faList);
    library.add(faTimes);
    library.add(faBars);
    library.add(faCode);
    library.add(faHome);
    library.add(faCubes);
    library.add(faExpandWide);
  }
}
