import { NgModule } from "@angular/core";
import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";
import { CheckboxPageComponent } from "./checkbox-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: CheckboxPageComponent }];

@NgModule({
    declarations: [CheckboxPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, CheckBoxModule],
    exports: [RouterModule, CheckBoxModule],
})
export class CheckboxPageModule {}
