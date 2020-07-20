import { NgModule } from "@angular/core";
import { DocsWrapperComponent } from "./docs-wrapper.component";
import { SideMenuModule } from "../common/side-menu/side-menu.module";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FooterModule } from "../common/footer/footer.module";
import components from "../../assets/components-list.json";

function getComponentPageRoutes(): Routes {
    return components.map(({ path, filePath, module }: ComponentsListItem) => {
        const component: string = path.replace("/docs/", "");
        return {
            path: component,
            component: DocsWrapperComponent,
            // This is the only way to trigger Angular to pre-process the file path import(`${filePath})
            loadChildren: () => import(`${filePath}`).then(m => m[module]),
        };
    });
}

const routes: Routes = [
    { path: "", redirectTo: "getting-started", pathMatch: "full" },
    {
        path: "getting-started",
        component: DocsWrapperComponent,
        loadChildren: () => import("./getting-started/getting-started.module").then(m => m.GettingStartedModule),
    },
    ...getComponentPageRoutes(),
];

@NgModule({
    declarations: [DocsWrapperComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FooterModule, SideMenuModule],
    exports: [RouterModule, FooterModule, SideMenuModule],
})
export class DocsWrapperModule {}
