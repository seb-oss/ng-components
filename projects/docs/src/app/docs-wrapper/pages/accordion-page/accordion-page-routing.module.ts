import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccordionPageComponent } from "./accordion-page.component";

const routes: Routes = [{ path: "", component: AccordionPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccordionPageRoutingModule {}
