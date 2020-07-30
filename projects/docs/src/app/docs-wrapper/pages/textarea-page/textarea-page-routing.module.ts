import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TextareaPageComponent } from "./textarea-page.component";

const routes: Routes = [{ path: "", component: TextareaPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TextareaPageRoutingModule {}
