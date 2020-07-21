import { NgModule } from "@angular/core";
import { ProgressbarModule } from "@sebgroup/ng-components/progressbar";
import { ProgressbarPageComponent } from "./progressbar-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { StepperModule } from "@sebgroup/ng-components/stepper";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
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
        CheckboxModule,
        DropdownModule,
        SliderModule,
    ],
})
export class ProgressbarPageModule {}
