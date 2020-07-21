import { NgModule } from "@angular/core";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { DropdownPageComponent } from "./dropdown-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";

const routes: Routes = [{ path: "", component: DropdownPageComponent }];

@NgModule({
    declarations: [DropdownPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, DropdownModule, CheckboxModule],
})
export class DropdownPageModule {}
