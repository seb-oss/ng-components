import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatepickerPageComponent } from "./datepicker-page.component";

const routes: Routes = [{ path: "", component: DatepickerPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DatepickerPageRoutingModule {}
