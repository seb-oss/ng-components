import { NgModule } from "@angular/core";
import { DocsWrapperComponent } from "./docs-wrapper.component";
import { SideMenuModule } from "../common/side-menu/side-menu.module";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FooterModule } from "../common/footer/footer.module";
import components from "../../assets/components-list.json";

function getComponentPageRoutes(): Routes {
    return components.map(({ path, name, filePath }) => {
        const componentNameLowercase: string = path.replace("/docs/", "");
        return {
            path: componentNameLowercase,
            component: DocsWrapperComponent,
            loadChildren: () =>
                import(`./pages/${componentNameLowercase}-page/${componentNameLowercase}-page.module`).then(
                    m => m && m[`${name.replace(" ", "")}PageModule`]
                ),
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
