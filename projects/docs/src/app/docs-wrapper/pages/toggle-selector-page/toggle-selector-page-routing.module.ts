import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ToggleSelectorComponent } from "./toggle-selector-page.component";

const routes: Routes = [{ path: "", component: ToggleSelectorComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ToggleSelectorPageRoutingModule {}
