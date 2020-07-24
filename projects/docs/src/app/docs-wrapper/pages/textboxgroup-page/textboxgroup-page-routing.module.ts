import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TextboxgroupPageComponent } from "./textboxgroup-page.component";

const routes: Routes = [{ path: "", component: TextboxgroupPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TextboxgroupPageRoutingModule {}
