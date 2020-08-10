import { NgModule } from "@angular/core";
import { TableModule } from "@sebgroup/ng-components/table";
import { TablePageComponent } from "./table-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { StepperModule } from "@sebgroup/ng-components/stepper";
import { TablePageRoutingModule } from "./table-page-routing.module";
import { PaginationModule } from "@sebgroup/ng-components/pagination";
import { CodeSnippetModule } from "@common/code-snippet/code-snippet.module";
import { MyTableComponent } from "./my-table-notes-example.component";

@NgModule({
    declarations: [MyTableComponent, TablePageComponent],
    imports: [
        CommonModule,
        TablePageRoutingModule,
        FormsModule,
        DocPageModule,
        TableModule,
        CheckboxModule,
        StepperModule,
        PaginationModule,
        CodeSnippetModule,
    ],
})
export class TablePageModule {}
