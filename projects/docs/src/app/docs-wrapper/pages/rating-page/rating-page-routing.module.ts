import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RatingPageComponent } from "./rating-page.component";

const routes: Routes = [{ path: "", component: RatingPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RatingPageRoutingModule {}
