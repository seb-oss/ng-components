import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CodeSnippetComponent } from "./code-snippet.component";
import { APIExtractService } from "../services/api-extract.service";
import { FilesIconComponent } from "../icons/files-icon.component";
import { CheckIconComponent } from "../icons/check-icon.component";
import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions } from "ngx-highlightjs";

@NgModule({
    declarations: [CodeSnippetComponent, FilesIconComponent, CheckIconComponent],
    imports: [CommonModule, HighlightModule],
    exports: [CodeSnippetComponent],
    providers: [
        APIExtractService,
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: <HighlightOptions>{
                lineNumbers: true,
            },
        },
    ],
})
export class CodeSnippetModule {}
