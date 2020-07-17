import { NgModule } from "@angular/core";
import { ProgressbarModule } from "@sebgroup/ng-components/progressbar";
import { ProgressbarPageComponent } from "./progressbar-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { StepperModule } from "@sebgroup/ng-components/stepper";
import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { SliderModule } from "@sebgroup/ng-components/slider";

const routes: Routes = [{ path: "", component: ProgressbarPageComponent }];

@NgModule({
    declarations: [ProgressbarPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        DocPageModule,
        ProgressbarModule,
        StepperModule,
        CheckBoxModule,
        DropdownModule,
        SliderModule,
    ],
    exports: [RouterModule, ProgressbarModule],
})
export class ProgressbarPageModule {}
