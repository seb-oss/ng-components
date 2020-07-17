import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckboxComponent } from "./checkbox.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [CheckboxComponent],
    exports: [CheckboxComponent],
})
export class CheckboxModule {}
