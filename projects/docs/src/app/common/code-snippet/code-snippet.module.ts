import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CodeSnippetComponent } from "./code-snippet.component";
import { APIExtractService } from "../services/api-extract.service";

@NgModule({
    declarations: [CodeSnippetComponent],
    imports: [CommonModule],
    exports: [CodeSnippetComponent],
    providers: [APIExtractService]
})
export class CodeSnippetModule {}
