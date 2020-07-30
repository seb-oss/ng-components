import { NgModule } from "@angular/core";
import { ChipModule } from "@sebgroup/ng-components/chip";
import { ChipPageComponent } from "./chip-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { ChipPageRoutingModule } from "./chip-page-routing.module";

@NgModule({
    declarations: [ChipPageComponent],
    imports: [CommonModule, ChipPageRoutingModule, FormsModule, DocPageModule, ChipModule],
})
export class ChipPageModule {}
