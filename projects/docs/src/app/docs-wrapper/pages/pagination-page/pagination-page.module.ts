import { NgModule } from "@angular/core";
import { PaginationModule } from "@sebgroup/ng-components/pagination";
import { PaginationPageComponent } from "./pagination-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: PaginationPageComponent }];

@NgModule({
    declarations: [PaginationPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, PaginationModule],
    exports: [RouterModule, PaginationModule],
})
export class PaginationPageModule {}
