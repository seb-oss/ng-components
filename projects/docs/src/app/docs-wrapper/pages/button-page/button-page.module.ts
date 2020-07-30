import { NgModule } from "@angular/core";
import { ButtonModule } from "@sebgroup/ng-components/button";
import { ButtonPageComponent } from "./button-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { ButtonPageRoutingModule } from "./button-page-routing.module";

@NgModule({
    declarations: [ButtonPageComponent],
    imports: [CommonModule, ButtonPageRoutingModule, FormsModule, DocPageModule, ButtonModule, DropdownModule, CheckboxModule],
})
export class ButtonPageModule {}
