import { NgModule } from "@angular/core";
import { TabsModule } from "@sebgroup/ng-components/tabs";
import { DocPageComponent } from "./doc-page.component";
import { CommonModule } from "@angular/common";
import { APIExtractService } from "../../common/services/api-extract.service";
import { APIsComponent } from "./apis/apis.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PlaygroundComponent } from "./playground/playground.component";
import { CodeSnippetModule } from "../../common/code-snippet/code-snippet.module";
import { DynamicFormModule } from "@sebgroup/ng-components/dynamic-form";
import { SafeHtmlPipe } from "@common/pipes/safe-html.pipe";

@NgModule({
    declarations: [DocPageComponent, PlaygroundComponent, APIsComponent, SafeHtmlPipe],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TabsModule, CodeSnippetModule, DynamicFormModule],
    exports: [DocPageComponent, DynamicFormModule],
    providers: [APIExtractService],
})
export class DocPageModule {}
