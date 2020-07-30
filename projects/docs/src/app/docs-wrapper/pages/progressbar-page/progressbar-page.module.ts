import { NgModule } from "@angular/core";
import { ProgressbarModule } from "@sebgroup/ng-components/progressbar";
import { ProgressbarPageComponent } from "./progressbar-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { StepperModule } from "@sebgroup/ng-components/stepper";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { SliderModule } from "@sebgroup/ng-components/slider";
import { ProgressbarPageRoutingModule } from "./progressbar-page-routing.module";

@NgModule({
    declarations: [ProgressbarPageComponent],
    imports: [
        CommonModule,
        ProgressbarPageRoutingModule,
        FormsModule,
        DocPageModule,
        ProgressbarModule,
        StepperModule,
        CheckboxModule,
        DropdownModule,
        SliderModule,
    ],
})
export class ProgressbarPageModule {}
