import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CheckboxGroupComponent } from "./checkbox-group.component";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [CheckboxGroupComponent],
    exports: [CheckboxGroupComponent],
})
export class CheckboxGroupModule {}
