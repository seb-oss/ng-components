import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TextlabelPageComponent } from "./textlabel-page.component";

const routes: Routes = [{ path: "", component: TextlabelPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TextlabelPageRoutingModule {}
