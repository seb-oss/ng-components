import { NgModule } from "@angular/core";
import { AccordionModule } from "@sebgroup/ng-components/accordion";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { StepperModule } from "@sebgroup/ng-components/stepper";
import { AccordionPageComponent } from "./accordion-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { AccordionPageRoutingModule } from "./accordion-page-routing.module";

@NgModule({
    declarations: [AccordionPageComponent],
    imports: [CommonModule, AccordionPageRoutingModule, FormsModule, DocPageModule, AccordionModule, CheckboxModule, StepperModule],
})
export class AccordionPageModule {}
