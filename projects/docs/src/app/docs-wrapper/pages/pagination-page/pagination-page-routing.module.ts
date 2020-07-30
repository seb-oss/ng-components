import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaginationPageComponent } from "./pagination-page.component";

const routes: Routes = [{ path: "", component: PaginationPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PaginationPageRoutingModule {}
