import { NgModule } from "@angular/core";
import { RadioGroupModule } from "@sebgroup/ng-components/radio-group";
import { RadioGroupPageComponent } from "./radiogroup-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";

const routes: Routes = [{ path: "", component: RadioGroupPageComponent }];

@NgModule({
    declarations: [RadioGroupPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, RadioGroupModule, CheckBoxModule],
    exports: [RouterModule, RadioGroupModule],
})
export class RadioGroupPageModule {}
