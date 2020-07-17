import { NgModule } from "@angular/core";
import { SliderModule } from "@sebgroup/ng-components/slider";
import { SliderPageComponent } from "./slider-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: SliderPageComponent }];

@NgModule({
    declarations: [SliderPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, SliderModule, ReactiveFormsModule],
    exports: [RouterModule, SliderModule],
})
export class SliderPageModule {}
