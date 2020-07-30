import { NgModule } from "@angular/core";
import { DropdownModule } from "@sebgroup/ng-components/dropdown";
import { DropdownPageComponent } from "./dropdown-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { DropdownPageRoutingModule } from "./dropdown-page-routing.module";

@NgModule({
    declarations: [DropdownPageComponent],
    imports: [CommonModule, DropdownPageRoutingModule, FormsModule, DocPageModule, DropdownModule, CheckboxModule],
})
export class DropdownPageModule {}
