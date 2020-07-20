import { NgModule } from "@angular/core";
import { DocsWrapperComponent } from "./docs-wrapper/docs-wrapper.component";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import components from "../assets/components-list.json";
import { FooterModule } from "./common/footer/footer.module";
import { SideMenuModule } from "./common/side-menu/side-menu.module";
import { HomeModule } from "./home/home.module";
import { LoaderModule } from "@sebgroup/ng-components/loader";

function getComponentPageRoutes(): Routes {
    return components.map(({ path, filePath, module }: ComponentsListItem) => {
        const component: string = path.replace("/docs/", "");
        return {
            path: component,
            // This is the only way to trigger Angular to pre-process the file path import(`${filePath})
            loadChildren: () => import(`${filePath}`).then(m => m[module]),
        };
    });
}

const routes: Routes = [
    { path: "", loadChildren: () => import("./home/home.module").then(m => m.HomeModule) },
    {
        path: "docs",
        component: DocsWrapperComponent,
        children: [
            { path: "", redirectTo: "getting-started", pathMatch: "full" },
            {
                path: "getting-started",
                loadChildren: () => import("./docs-wrapper/getting-started/getting-started.module").then(m => m.GettingStartedModule),
            },
            ...getComponentPageRoutes(),
        ],
    },
    { path: "**", loadChildren: () => import("./common/not-found/not-found.module").then(m => m.NotFoundModule) },
];

@NgModule({
    declarations: [DocsWrapperComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FooterModule, SideMenuModule, HomeModule, LoaderModule],
    exports: [LoaderModule],
})
export class AppRouterModule {}
