import { NgModule } from "@angular/core";
import { SliderModule } from "@sebgroup/ng-components/slider";
import { SliderPageComponent } from "./slider-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SliderPageRoutingModule } from "./slider-page-routing.module";
import { StepperModule } from "@sebgroup/ng-components/stepper";

@NgModule({
    declarations: [SliderPageComponent],
    imports: [CommonModule, SliderPageRoutingModule, FormsModule, DocPageModule, SliderModule, ReactiveFormsModule, StepperModule],
})
export class SliderPageModule {}
