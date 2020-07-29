import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TimerPageComponent } from "./timer-page.component";

const routes: Routes = [{ path: "", component: TimerPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TimerPageRoutingModule {}
