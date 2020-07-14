import { NgModule } from "@angular/core";
import { ModalModule } from "@sebgroup/ng-components/modal";
import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { ModalPageComponent } from "./modal-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions } from "ngx-highlightjs";

const routes: Routes = [{ path: "", component: ModalPageComponent }];

@NgModule({
    declarations: [ModalPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        DocPageModule,
        ModalModule,
        CheckBoxModule,
        DropdownModule,
        HighlightModule,
    ],
    exports: [RouterModule, ModalModule],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: <HighlightOptions>{
                lineNumbers: true,
            },
        },
    ],
})
export class ModalPageModule {}
