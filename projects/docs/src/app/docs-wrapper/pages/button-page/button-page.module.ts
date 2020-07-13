import { NgModule } from "@angular/core";
import { ButtonModule } from "@sebgroup/ng-components/button";
import { ButtonPageComponent } from "./button-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: ButtonPageComponent }];

@NgModule({
    declarations: [ButtonPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, ButtonModule],
    exports: [RouterModule, ButtonModule],
})
export class ButtonPageModule {}
