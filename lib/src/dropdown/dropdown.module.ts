import { NgModule } from "@angular/core";
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DropdownComponent } from "./dropdown.component";

@NgModule({
    imports: [
        // NgbModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [DropdownComponent],
    exports: [DropdownComponent],
})
export class DropDownModule {}
