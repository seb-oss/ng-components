import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DynamicFormPageComponent } from "./dynamic-form-page.component";

const router: Routes = [{ path: "", component: DynamicFormPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(router)],
    exports: [RouterModule],
})
export class DynamicFormPageRoutingModule {}
