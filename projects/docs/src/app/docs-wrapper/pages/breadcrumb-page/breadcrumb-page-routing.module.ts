import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BreadcrumbPageComponent } from "./breadcrumb-page.component";

const routes: Routes = [{ path: "", component: BreadcrumbPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BreadcrumbPageRoutingModule {}
