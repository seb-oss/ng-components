import { NgModule } from "@angular/core";
import { TextareaModule } from "@sebgroup/ng-components/textarea";
import { TextareaPageComponent } from "./textarea-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { TextareaPageRoutingModule } from "./textarea-page-routing.module";

@NgModule({
    declarations: [TextareaPageComponent],
    imports: [CommonModule, TextareaPageRoutingModule, FormsModule, DocPageModule, TextareaModule],
})
export class TextareaPageModule {}
