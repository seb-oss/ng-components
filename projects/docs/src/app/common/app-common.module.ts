import { NgModule } from "@angular/core";
import { FooterModule } from "./footer/footer.module";
import { CodeSnippetModule } from "./code-snippet/code-snippet.module";
import { TechStackModule } from "./tech-stack/tech-stack.module";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BarsIconComponent } from "./icons/bars-icon.component";
import { ExternalLinkIconComponent } from "./icons/external-link-icon.component";
import { SearchIconComponent } from "./icons/search-icon.component";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
    declarations: [BarsIconComponent, ExternalLinkIconComponent, SearchIconComponent, NotFoundComponent],
    imports: [FooterModule, CodeSnippetModule, TechStackModule, BrowserModule, RouterModule, CommonModule],
    exports: [
        FooterModule,
        CodeSnippetModule,
        TechStackModule,
        BrowserModule,
        RouterModule,
        CommonModule,
        BarsIconComponent,
        ExternalLinkIconComponent,
        SearchIconComponent,
    ],
})
export class AppCommonModule {}
