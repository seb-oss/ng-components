import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToggleSelectorComponent, CheckedPipe } from "./toggle-selector.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ToggleSelectorComponent, CheckedPipe],
    providers: [CheckedPipe],
    exports: [ToggleSelectorComponent],
})
export class ToggleSelectorModule {}
