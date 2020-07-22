import { NgModule } from "@angular/core";
import { CollapsePageComponent } from "./collapse-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { CollapseModule } from "@sebgroup/ng-components/collapse";
import { ToggleModule } from "@sebgroup/ng-components/toggle";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: CollapsePageComponent }];

@NgModule({
    declarations: [CollapsePageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, CollapseModule, ToggleModule],
})
export class CollapsePageModule {}
