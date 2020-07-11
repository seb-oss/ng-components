import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DocsWrapperComponent } from "./docs-wrapper/docs-wrapper.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { NotFoundComponent } from "./common/not-found/not-found.component";
import { AccordionPageComponent } from "./pages/accordion-page/accordion-page.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    {
        path: "docs",
        component: DocsWrapperComponent,
        children: [
            { path: "", redirectTo: "getting-started", pathMatch: "full" },
            { path: "getting-started", component: GettingStartedComponent },
            { path: "accordion", component: AccordionPageComponent },
        ],
    },
    { path: "**", component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
