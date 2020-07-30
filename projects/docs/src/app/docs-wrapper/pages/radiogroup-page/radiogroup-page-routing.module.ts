import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RadioGroupPageComponent } from "./radiogroup-page.component";

const routes: Routes = [{ path: "", component: RadioGroupPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RadioGroupPageRoutingModule {}
