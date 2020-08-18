import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TextboxPageComponent } from "./textbox-page.component";

const routes: Routes = [{ path: "", component: TextboxPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TextboxPageRoutingModule {}
