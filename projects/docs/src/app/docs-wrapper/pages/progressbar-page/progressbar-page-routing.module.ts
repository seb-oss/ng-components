import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProgressbarPageComponent } from "./progressbar-page.component";

const routes: Routes = [{ path: "", component: ProgressbarPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProgressbarPageRoutingModule {}
