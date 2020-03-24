import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SideMenuComponent } from "./components/menu/side-menu.component";
import { ExamplePageComponent } from "./components/example-page/example-page.component";
import { ExamplesModule } from "./examples/examples.module";
import { HeaderComponent } from "./components/header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LogoComponent } from "./components/logo/logo.component";
import { ExampleListComponent } from "./components/example-page/example-list/example-list.component";
import {
    ExampleTemplateComponent,
    CodeExampleDirective,
} from "./components/example-page/example-list/example-template/example-template.component";
import { ExemplifyModule } from "angular-exemplify";
import { ApiListComponent } from "./components/example-page/api-list/api-list.component";
import { InstallationComponent } from "./components/installation/installation.component";

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
        InstallationComponent,
    ],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ExemplifyModule, ExamplesModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
