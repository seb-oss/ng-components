import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VideoPageComponent } from "./video-page.component";

const routes: Routes = [{ path: "", component: VideoPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VideoPageRoutingModule {}
