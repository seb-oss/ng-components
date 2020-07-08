import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CodeSnippetComponent } from "./code-snippet.component";

@NgModule({
    declarations: [CodeSnippetComponent],
    imports: [CommonModule],
    exports: [CodeSnippetComponent],
})
export class CodeSnippetModule {}
