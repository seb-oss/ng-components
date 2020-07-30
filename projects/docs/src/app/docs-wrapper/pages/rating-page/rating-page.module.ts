import { NgModule } from "@angular/core";
import { RatingModule } from "@sebgroup/ng-components/rating";
import { RatingPageComponent } from "./rating-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { StepperModule } from "@sebgroup/ng-components/stepper";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { RatingPageRoutingModule } from "./rating-page-routing.module";

@NgModule({
    declarations: [RatingPageComponent],
    imports: [CommonModule, RatingPageRoutingModule, FormsModule, DocPageModule, RatingModule, StepperModule, CheckboxModule],
})
export class RatingPageModule {}
