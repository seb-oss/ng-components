import { NgModule } from "@angular/core";
import { TextAreaModule } from "@sebgroup/ng-components/textarea";
import { TextareaPageComponent } from "./textarea-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: TextareaPageComponent }];

@NgModule({
    declarations: [TextareaPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, TextAreaModule],
    exports: [RouterModule, TextAreaModule],
})
export class TextareaPageModule {}
