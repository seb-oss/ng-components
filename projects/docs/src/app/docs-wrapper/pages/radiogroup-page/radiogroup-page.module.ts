import { NgModule } from "@angular/core";
import { RadioGroupModule } from "@sebgroup/ng-components/radio-group";
import { RadioGroupPageComponent } from "./radiogroup-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { RadioGroupPageRoutingModule } from "./radiogroup-page-routing.module";

@NgModule({
    declarations: [RadioGroupPageComponent],
    imports: [CommonModule, RadioGroupPageRoutingModule, FormsModule, DocPageModule, RadioGroupModule, CheckboxModule],
})
export class RadioGroupPageModule {}
