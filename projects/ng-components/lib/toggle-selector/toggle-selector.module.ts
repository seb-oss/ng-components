import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToggleSelectorComponent } from "./toggle-selector.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ToggleSelectorComponent],
    exports: [ToggleSelectorComponent],
})
export class ToggleSelectorModule {}
