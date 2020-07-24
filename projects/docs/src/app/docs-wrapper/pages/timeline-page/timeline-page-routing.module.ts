import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TimelinePageComponent } from "./timeline-page.component";

const routes: Routes = [{ path: "", component: TimelinePageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TimelinePageRoutingModule {}
