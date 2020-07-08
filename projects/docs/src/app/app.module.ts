import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { NavbarModule } from "./common/navbar/navbar.module";
import { FooterModule } from "./common/footer/footer.module";
import { CodeSnippetModule } from "./common/code-snippet/code-snippet.module";
import { DocsWrapperModule } from "./docs-wrapper/docs-wrapper.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { TechStackModule } from "./common/tech-stack/tech-stack.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GettingStartedComponent,
  ],
  imports: [
    BrowserModule,
    NavbarModule,
    FooterModule,
    CodeSnippetModule,
    DocsWrapperModule,
    TechStackModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
