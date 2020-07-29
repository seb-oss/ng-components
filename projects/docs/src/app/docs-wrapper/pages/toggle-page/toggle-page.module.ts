import { NgModule } from "@angular/core";
import { TogglePageComponent } from "./toggle-page.component";
import { ToggleModule } from "@sebgroup/ng-components/toggle";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { TogglePageRoutingModule } from "./toggle-page-routing.module";

@NgModule({
    declarations: [TogglePageComponent],
    imports: [CommonModule, TogglePageRoutingModule, FormsModule, DocPageModule, ToggleModule, CheckboxModule],
})
export class TogglePageModule {}
