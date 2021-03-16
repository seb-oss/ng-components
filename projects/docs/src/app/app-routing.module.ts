import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: "", loadChildren: () => import("./home/home.module").then(m => m.HomeModule) },
    { path: "docs", loadChildren: () => import("./docs-wrapper/docs-wrapper.module").then(m => m.DocsWrapperModule) },
    { path: "404", loadChildren: () => import("./common/not-found/not-found.module").then(m => m.NotFoundModule) },
    { path: "**", loadChildren: () => import("./common/not-found/not-found.module").then(m => m.NotFoundModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
