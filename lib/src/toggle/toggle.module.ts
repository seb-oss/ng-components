import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToggleComponent } from "./toggle.component";
@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ToggleComponent],
    exports: [ToggleComponent],
})
export class ToggleModule {}
