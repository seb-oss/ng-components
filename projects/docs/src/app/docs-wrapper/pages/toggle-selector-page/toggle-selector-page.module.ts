import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToggleSelectorPageComponent } from "./toggle-selector-page.component";
import { ToggleSelectorModule } from "@sebgroup/ng-components/toggle-selector";
import { ToggleSelectorPageRoutingModule } from "./toggle-selector-page.routing.module";
import { DocPageModule } from "../../doc-page/doc-page.module";

@NgModule({
    declarations: [ToggleSelectorPageComponent],
    imports: [ToggleSelectorPageRoutingModule, ToggleSelectorModule, CommonModule, FormsModule, DocPageModule],
})
export class ToggleSelectorPageModule {}
