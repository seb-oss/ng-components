import { NgModule } from "@angular/core";
import { TextboxGroupModule } from "@sebgroup/ng-components/textboxGroup";
import { TextboxgroupPageComponent } from "./textboxgroup-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { TextboxgroupPageRoutingModule } from "./textboxgroup-page-routing.module";

@NgModule({
    declarations: [TextboxgroupPageComponent],
    imports: [CommonModule, TextboxgroupPageRoutingModule, FormsModule, DocPageModule, TextboxGroupModule],
})
export class TextboxGroupPageModule {}
