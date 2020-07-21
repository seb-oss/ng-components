import { NgModule } from "@angular/core";
import { ModalModule } from "@sebgroup/ng-components/modal";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { ModalPageComponent } from "./modal-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions } from "ngx-highlightjs";
import { CodeSnippetModule } from "../../../common/code-snippet/code-snippet.module";

const routes: Routes = [{ path: "", component: ModalPageComponent }];

@NgModule({
    declarations: [ModalPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        DocPageModule,
        ModalModule,
        CheckboxModule,
        DropdownModule,
        HighlightModule,
        CodeSnippetModule,
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                lineNumbers: true,
            } as HighlightOptions,
        },
    ],
})
export class ModalPageModule {}
