import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoaderModule } from "@sebgroup/ng-components/loader";

const routes: Routes = [
    { path: "", loadChildren: () => import("./home/home.module").then(m => m.HomeModule) },
    { path: "docs", loadChildren: () => import("./docs-wrapper/docs-wrapper.module").then(m => m.DocsWrapperModule) },
    { path: "**", loadChildren: () => import("./common/not-found/not-found.module").then(m => m.NotFoundModule) },
];

@NgModule({
    declarations: [AppComponent],
    imports: [CommonModule, BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes), HomeModule, LoaderModule],
    exports: [RouterModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
