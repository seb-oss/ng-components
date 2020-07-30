import { NgModule } from "@angular/core";
import { CollapsePageComponent } from "./collapse-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { CollapseModule } from "@sebgroup/ng-components/collapse";
import { ToggleModule } from "@sebgroup/ng-components/toggle";
import { FormsModule } from "@angular/forms";
import { CollapsePageRoutingModule } from "./collapse-page-routing.module";

@NgModule({
    declarations: [CollapsePageComponent],
    imports: [CommonModule, CollapsePageRoutingModule, FormsModule, DocPageModule, CollapseModule, ToggleModule],
})
export class CollapsePageModule {}
