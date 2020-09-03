import { NgModule } from "@angular/core";
import { TextboxModule } from "@sebgroup/ng-components/textbox";
import { TextboxPageComponent } from "./textbox-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { TextboxPageRoutingModule } from "./textbox-page-routing.module";

@NgModule({
    declarations: [TextboxPageComponent],
    imports: [CommonModule, TextboxPageRoutingModule, FormsModule, DocPageModule, TextboxModule],
})
export class TextboxPageModule {}
