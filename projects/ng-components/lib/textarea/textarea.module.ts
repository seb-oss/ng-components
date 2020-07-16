import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextareaComponent } from "./textarea.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TextareaComponent],
    exports: [TextareaComponent],
})
export class TextareaModule {}
