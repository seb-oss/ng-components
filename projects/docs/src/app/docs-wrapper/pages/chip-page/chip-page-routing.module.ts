import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChipPageComponent } from "./chip-page.component";

const routes: Routes = [{ path: "", component: ChipPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChipPageRoutingModule {}
