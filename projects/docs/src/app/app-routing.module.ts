import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DocsWrapperComponent } from "./docs-wrapper/docs-wrapper.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { DocPageComponent } from "./doc-page/doc-page.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    {
        path: "docs",
        component: DocsWrapperComponent,
        children: [
            { path: "", redirectTo: "getting-started", pathMatch: "full" },
            { path: "getting-started", component: GettingStartedComponent },
            { path: ":component", component: DocPageComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
