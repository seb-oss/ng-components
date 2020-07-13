import { NgModule } from "@angular/core";
import { ChipModule } from "@sebgroup/ng-components/chip";
import { ChipPageComponent } from "./chip-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: ChipPageComponent }];

@NgModule({
    declarations: [ChipPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, ChipModule],
    exports: [RouterModule, ChipModule],
})
export class ChipPageModule {}
