import { NgModule } from "@angular/core";
import { TextLabelModule } from "@sebgroup/ng-components/textLabel";
import { TextlabelPageComponent } from "./textlabel-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";

const routes: Routes = [{ path: "", component: TextlabelPageComponent }];

@NgModule({
    declarations: [TextlabelPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, TextLabelModule, CheckboxModule],
})
export class TextlabelPageModule {}
