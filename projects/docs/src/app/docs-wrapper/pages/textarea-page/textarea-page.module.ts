import { NgModule } from "@angular/core";
import { TextareaModule } from "@sebgroup/ng-components/textarea";
import { TextareaPageComponent } from "./textarea-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { DynamicFormModule } from "../../../common/dynamic-form/dynamic-form.module";

const routes: Routes = [{ path: "", component: TextareaPageComponent }];

@NgModule({
    declarations: [TextareaPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, TextareaModule, DynamicFormModule],
    exports: [RouterModule, TextareaModule, DynamicFormModule],
})
export class TextareaPageModule {}
