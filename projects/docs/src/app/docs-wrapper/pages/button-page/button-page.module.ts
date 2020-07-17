import { NgModule } from "@angular/core";
import { ButtonModule } from "@sebgroup/ng-components/button";
import { ButtonPageComponent } from "./button-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";

const routes: Routes = [{ path: "", component: ButtonPageComponent }];

@NgModule({
    declarations: [ButtonPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, ButtonModule, DropdownModule, CheckboxModule],
    exports: [RouterModule, ButtonModule],
})
export class ButtonPageModule {}
