import { NgModule } from "@angular/core";
import { TextLabelModule } from "@sebgroup/ng-components/textLabel";
import { TextlabelPageComponent } from "./textlabel-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";

const routes: Routes = [{ path: "", component: TextlabelPageComponent }];

@NgModule({
    declarations: [TextlabelPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, TextLabelModule, CheckBoxModule],
    exports: [RouterModule, TextLabelModule],
})
export class TextlabelPageModule {}
