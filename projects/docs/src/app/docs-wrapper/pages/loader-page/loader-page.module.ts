import { NgModule } from "@angular/core";
import { LoaderModule } from "@sebgroup/ng-components/loader";
import { LoaderPageComponent } from "./loader-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { RadioGroupModule } from "projects/ng-components/public-api";

const routes: Routes = [{ path: "", component: LoaderPageComponent }];

@NgModule({
    declarations: [LoaderPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        DocPageModule,
        LoaderModule,
        CheckBoxModule,
        DropdownModule,
        RadioGroupModule,
    ],
    exports: [RouterModule, LoaderModule],
})
export class LoaderPageModule {}
