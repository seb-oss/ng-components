import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToggleSelectorComponent, ToggleSelectorSafeHtmlPipe } from "./toggle-selector.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ToggleSelectorComponent, ToggleSelectorSafeHtmlPipe],
    providers: [ToggleSelectorSafeHtmlPipe],
    exports: [ToggleSelectorComponent],
})
export class ToggleSelectorModule {}
