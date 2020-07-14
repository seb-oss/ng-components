import { NgModule } from "@angular/core";
import { TableModule } from "@sebgroup/ng-components/table";
import { TablePageComponent } from "./table-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: TablePageComponent }];

@NgModule({
    declarations: [TablePageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, TableModule],
    exports: [RouterModule, TableModule],
})
export class TablePageModule {}
