import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CodeSnippetComponent } from "./code-snippet.component";
import { APIExtractService } from "../services/api-extract.service";
import { FilesIconComponent } from "../icons/files-icon.component";
import { CheckIconComponent } from "../icons/check-icon.component";

@NgModule({
    declarations: [CodeSnippetComponent, FilesIconComponent, CheckIconComponent],
    imports: [CommonModule],
    exports: [CodeSnippetComponent],
    providers: [APIExtractService],
})
export class CodeSnippetModule {}
