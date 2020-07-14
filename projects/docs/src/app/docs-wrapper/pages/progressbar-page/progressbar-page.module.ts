import { NgModule } from "@angular/core";
import { ProgressBarModule } from "@sebgroup/ng-components/progressbar";
import { ProgressbarPageComponent } from "./progressbar-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: ProgressbarPageComponent }];

@NgModule({
    declarations: [ProgressbarPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, ProgressBarModule],
    exports: [RouterModule, ProgressBarModule],
})
export class ProgressBarPageModule {}
