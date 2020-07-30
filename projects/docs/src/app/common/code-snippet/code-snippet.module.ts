import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CodeSnippetComponent } from "./code-snippet.component";
import { APIExtractService } from "../services/api-extract.service";
import { FilesIconComponent } from "../icons/files-icon.component";
import { CheckIconComponent } from "../icons/check-icon.component";
import { HighlightModule, HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { loadHighlightJs } from "projects/docs/src/utils/loadHighlightjs";

/**
 * This is a replacement for `ngx-loadHighlightjs` options passed in `useValue`
 * This fix is implemented because the aforementioned method doesn't seem to be working at the momement
 *
 * The proper way is to pass `HighlightOptions` inside `APIExtractService` under `useValue` parameter
 */
loadHighlightJs();

@NgModule({
    declarations: [CodeSnippetComponent, FilesIconComponent, CheckIconComponent],
    imports: [CommonModule, HighlightModule],
    exports: [CodeSnippetComponent],
    providers: [
        APIExtractService,
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {},
        },
    ],
})
export class CodeSnippetModule {}
