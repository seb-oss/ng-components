import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DocsWrapperModule } from "./docs-wrapper/docs-wrapper.module";

const routes: Routes = [
    { path: "", loadChildren: () => import("./home/home.module").then(m => m.HomeModule) },
    { path: "docs", loadChildren: () => import("./docs-wrapper/docs-wrapper.module").then(m => m.DocsWrapperModule) },
    { path: "**", loadChildren: () => import("./common/not-found/not-found.module").then(m => m.NotFoundModule) },
];

@NgModule({
    declarations: [AppComponent],
    imports: [CommonModule, BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes), DocsWrapperModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
