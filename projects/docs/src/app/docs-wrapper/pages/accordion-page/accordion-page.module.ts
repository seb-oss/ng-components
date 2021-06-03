import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AccordionModule } from "@sebgroup/ng-components/accordion";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { StepperModule } from "@sebgroup/ng-components/stepper";
import { AccordionPageComponent } from "./accordion-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccordionPageRoutingModule } from "./accordion-page-routing.module";
import { DynamicFormModule } from "@sebgroup/ng-components/dynamic-form";

@NgModule({
    declarations: [AccordionPageComponent],
    imports: [
        CommonModule,
        AccordionPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DocPageModule,
        AccordionModule,
        CheckboxModule,
        StepperModule,
        DynamicFormModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionPageModule {}
