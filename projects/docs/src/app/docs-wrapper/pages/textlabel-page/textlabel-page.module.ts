import { NgModule } from "@angular/core";
import { TextLabelModule } from "@sebgroup/ng-components/textLabel";
import { TextlabelPageComponent } from "./textlabel-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { TextlabelPageRoutingModule } from "./textlabel-page-routing.module";

@NgModule({
    declarations: [TextlabelPageComponent],
    imports: [CommonModule, TextlabelPageRoutingModule, FormsModule, DocPageModule, TextLabelModule, CheckboxModule],
})
export class TextlabelPageModule {}
