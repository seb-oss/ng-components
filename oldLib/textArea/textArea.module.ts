import { NgModule } from "@angular/core";
import { TextAreaComponent } from "./textArea.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [TextAreaComponent],
    declarations: [TextAreaComponent]
})
export class TextAreaModule { }
