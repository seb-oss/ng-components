import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DropDownComponent } from "./dropDown.component";

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        FormsModule
    ],
    declarations: [DropDownComponent],
    exports: [DropDownComponent]
})
export class DropDownModule { }
