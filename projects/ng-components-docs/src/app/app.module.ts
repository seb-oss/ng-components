import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SideMenuComponent } from './components/menu/side-menu.component';
import { ExampleWrapperComponent } from './components/example-wrapper/example-wrapper.component';
import {DocsModule} from './docs/docs.module';
import { HeaderComponent } from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {faTimes} from '@fortawesome/pro-light-svg-icons/faTimes';
import {faList} from '@fortawesome/pro-light-svg-icons/faList';
import { BrandComponent } from './components/brand/brand.component';
import {faBars} from '@fortawesome/pro-light-svg-icons/faBars';
import {ExamplePageComponent} from './components/example-page/example-page.component';
import {ExampleComponentComponent, ExampleDirective} from './components/example-component/example-component.component';
import {faCode} from '@fortawesome/pro-light-svg-icons/faCode';
import {faHome} from '@fortawesome/pro-light-svg-icons/faHome';
import {faCubes} from '@fortawesome/pro-light-svg-icons/faCubes';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SideMenuComponent,
    ExampleWrapperComponent,
    HeaderComponent,
    BrandComponent,
    ExamplePageComponent,
    ExampleDirective,
    ExampleComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    DocsModule
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
  }
}
