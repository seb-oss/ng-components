import { NgModule } from "@angular/core";
import { TooltipPageComponent } from "./tooltip-page.component";
import { TooltipModule } from "@sebgroup/ng-components/tooltip";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { TooltipPageRoutingModule } from "./tooltip-page-routing.module";

@NgModule({
    declarations: [TooltipPageComponent],
    imports: [CommonModule, TooltipPageRoutingModule, FormsModule, DocPageModule, TooltipModule, CheckboxModule],
})
export class TooltipPageModule {}
