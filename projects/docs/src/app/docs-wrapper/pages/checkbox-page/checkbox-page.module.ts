import { NgModule } from "@angular/core";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { CheckboxPageComponent } from "./checkbox-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { HighlightModule } from "ngx-highlightjs";
import { CodeSnippetModule } from "../../../common/code-snippet/code-snippet.module";

const routes: Routes = [{ path: "", component: CheckboxPageComponent }];

@NgModule({
    declarations: [CheckboxPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, CheckboxModule, HighlightModule, CodeSnippetModule],
    exports: [RouterModule, CheckboxModule],
})
export class CheckboxPageModule {}
