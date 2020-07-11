import { NgModule } from "@angular/core";
import { DocsWrapperComponent } from "./docs-wrapper.component";
import { SideMenuModule } from "../common/side-menu/side-menu.module";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FooterModule } from "../common/footer/footer.module";

const routes: Routes = [
    { path: "", redirectTo: "getting-started", pathMatch: "full" },
    {
        path: "getting-started",
        component: DocsWrapperComponent,
        loadChildren: () => import("./getting-started/getting-started.module").then(m => m.GettingStartedModule),
    },
    {
        path: "accordion",
        component: DocsWrapperComponent,
        loadChildren: () => import("./pages/accordion-page/accordion-page.module").then(m => m.AccordionPageModule),
    },
];

@NgModule({
    declarations: [DocsWrapperComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FooterModule, SideMenuModule],
    exports: [RouterModule, FooterModule, SideMenuModule],
})
export class DocsWrapperModule {}
