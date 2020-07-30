import { NgModule } from "@angular/core";
import { PaginationModule } from "@sebgroup/ng-components/pagination";
import { PaginationPageComponent } from "./pagination-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { StepperModule } from "@sebgroup/ng-components/stepper";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { PaginationPageRoutingModule } from "./pagination-page-routing.module";

@NgModule({
    declarations: [PaginationPageComponent],
    imports: [CommonModule, PaginationPageRoutingModule, FormsModule, DocPageModule, PaginationModule, StepperModule, CheckboxModule],
})
export class PaginationPageModule {}
