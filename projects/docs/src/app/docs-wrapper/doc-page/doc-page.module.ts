import { NgModule } from "@angular/core";
import { TabsModule } from "@sebgroup/ng-components/tabs";
import { PlaygroundComponent } from "./playground/playground.component";
import { DocPageComponent } from "./doc-page.component";
import { CommonModule } from "@angular/common";
import { APIExtractService } from "../../common/services/api-extract.service";
import { ControlsComponent } from "./controls/controls.component";
import { APIsComponent } from "./apis/apis.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [DocPageComponent, PlaygroundComponent, ControlsComponent, APIsComponent],
    imports: [CommonModule, FormsModule, TabsModule],
    exports: [DocPageComponent],
    providers: [APIExtractService],
})
export class DocPageModule {}
