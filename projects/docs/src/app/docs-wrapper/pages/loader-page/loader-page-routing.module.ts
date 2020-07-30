import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoaderPageComponent } from "./loader-page.component";

const routes: Routes = [{ path: "", component: LoaderPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoaderPageRoutingModule {}
