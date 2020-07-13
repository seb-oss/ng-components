import { NgModule } from "@angular/core";
import { LoaderModule } from "@sebgroup/ng-components/loader";
import { LoaderPageComponent } from "./loader-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: LoaderPageComponent }];

@NgModule({
    declarations: [LoaderPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, LoaderModule],
    exports: [RouterModule, LoaderModule],
})
export class LoaderPageModule {}
