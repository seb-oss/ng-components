import { NgModule } from "@angular/core";
import { TabsModule } from "@sebgroup/ng-components/tabs";
import { DocPageComponent } from "./doc-page.component";
import { CommonModule } from "@angular/common";
import { APIExtractService } from "../../common/services/api-extract.service";
import { APIsComponent } from "./apis/apis.component";
import { FormsModule } from "@angular/forms";
import { PlaygroundComponent } from "./playground/playground.component";
import { DocNotesComponent } from "./notes/notes.component";

@NgModule({
    declarations: [DocPageComponent, PlaygroundComponent, APIsComponent, DocNotesComponent],
    imports: [CommonModule, FormsModule, TabsModule],
    exports: [DocPageComponent],
    providers: [APIExtractService],
})
export class DocPageModule {}
