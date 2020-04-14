import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DropdownComponent } from "./dropdown.component";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [DropdownComponent],
    exports: [DropdownComponent],
})
export class DropdownModule {}
