import { NgModule } from "@angular/core";
import { StepperModule } from "@sebgroup/ng-components/stepper";
import { StepperPageComponent } from "./stepper-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { DynamicFormModule } from "@sebgroup/ng-components/dynamic-form";
import { StepperPageRoutingModule } from "./stepper-page-routing.module";

@NgModule({
    declarations: [StepperPageComponent],
    imports: [CommonModule, StepperPageRoutingModule, FormsModule, DocPageModule, StepperModule, DynamicFormModule],
})
export class StepperPageModule {}
