import { NgModule } from "@angular/core";
import { ModalModule } from "@sebgroup/ng-components/modal";
import { ModalPageComponent } from "./modal-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: ModalPageComponent }];

@NgModule({
    declarations: [ModalPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, ModalModule],
    exports: [RouterModule, ModalModule],
})
export class ModalPageModule {}
