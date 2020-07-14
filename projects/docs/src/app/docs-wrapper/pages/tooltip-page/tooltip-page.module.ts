import { NgModule } from "@angular/core";
import { TooltipPageComponent } from "./tooltip-page.component";
import { TooltipModule } from "@sebgroup/ng-components/tooltip";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: TooltipPageComponent }];

@NgModule({
    declarations: [TooltipPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, TooltipModule],
    exports: [RouterModule, TooltipModule],
})
export class TooltipPageModule { }
