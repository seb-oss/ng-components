import { NgModule } from "@angular/core";
import { TextboxGroupModule } from "@sebgroup/ng-components/textboxGroup";
import { TextboxgroupPageComponent } from "./textboxgroup-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { DynamicFormModule } from "../../../common/dynamic-form/dynamic-form.module";

const routes: Routes = [{ path: "", component: TextboxgroupPageComponent }];

@NgModule({
    declarations: [TextboxgroupPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, TextboxGroupModule, DynamicFormModule],
    exports: [RouterModule, TextboxGroupModule, DynamicFormModule],
})
export class TextboxGroupPageModule {}
