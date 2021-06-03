import { NgModule } from "@angular/core";
import { DynamicFormPageComponent } from "./dynamic-form-page.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DynamicFormPageRoutingModule } from "./dynamic-form-page-routing.module";
import { DocPageModule } from "../../doc-page/doc-page.module";

@NgModule({
    declarations: [DynamicFormPageComponent],
    imports: [CommonModule, FormsModule, DynamicFormPageRoutingModule, DocPageModule],
})
export class DynamicFormPageModule {}
