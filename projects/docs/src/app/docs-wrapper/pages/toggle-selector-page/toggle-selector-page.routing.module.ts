import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ToggleSelectorPageComponent } from "./toggle-selector-page.component";

const routes: Routes = [{ path: "", component: ToggleSelectorPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ToggleSelectorPageRoutingModule {}
