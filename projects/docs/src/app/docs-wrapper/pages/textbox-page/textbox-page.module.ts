import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { TextboxModule } from "@sebgroup/ng-components/textbox";
import { TextboxPageComponent } from "./textbox-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { TextboxPageRoutingModule } from "./textbox-page-routing.module";
import { LoaderModule } from "@sebgroup/ng-components/loader";

@NgModule({
    declarations: [TextboxPageComponent],
    imports: [CommonModule, TextboxPageRoutingModule, FormsModule, DocPageModule, TextboxModule, LoaderModule],
    schemas: [NO_ERRORS_SCHEMA],
})
export class TextboxPageModule {}
