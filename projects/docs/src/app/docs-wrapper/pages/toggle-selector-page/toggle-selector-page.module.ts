import { NgModule } from "@angular/core";
import { ToggleSelectorComponent } from "./toggle-selector-page.component";
import { ToggleModule } from "@sebgroup/ng-components/toggle";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { ToggleSelectorPageRoutingModule } from "./toggle-selector-page-routing.module";

@NgModule({
    declarations: [ToggleSelectorComponent],
    imports: [CommonModule, ToggleSelectorPageRoutingModule, FormsModule, DocPageModule, ToggleModule, CheckboxModule],
})
export class ToggleSelectorPageModule {}
