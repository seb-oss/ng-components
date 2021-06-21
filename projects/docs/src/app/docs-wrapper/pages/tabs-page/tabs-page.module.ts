import { NgModule } from "@angular/core";
import { TabsModule } from "@sebgroup/ng-components/tabs";
import { TabsPageComponent } from "./tabs-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { TabsPageRoutingModule } from "./tabs-page-routing.module";
import { StepperModule } from "@sebgroup/ng-components/stepper";

@NgModule({
    declarations: [TabsPageComponent],
    imports: [CommonModule, TabsPageRoutingModule, FormsModule, DocPageModule, TabsModule, StepperModule],
})
export class TabsPageModule {}
