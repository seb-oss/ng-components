import { NgModule } from "@angular/core";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { CheckboxPageComponent } from "./checkbox-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { HighlightModule } from "ngx-highlightjs";
import { CodeSnippetModule } from "../../../common/code-snippet/code-snippet.module";
import { CheckboxPageRoutingModule } from "./checkbox-page-routing.module";

@NgModule({
    declarations: [CheckboxPageComponent],
    imports: [CommonModule, CheckboxPageRoutingModule, FormsModule, DocPageModule, CheckboxModule, HighlightModule, CodeSnippetModule],
})
export class CheckboxPageModule {}
