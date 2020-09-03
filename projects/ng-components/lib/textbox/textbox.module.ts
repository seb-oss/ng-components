import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TextboxComponent } from "./textbox.component";
import { TextboxSafeHtmlPipe } from "./textboxSafeHtml.pipe";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TextboxComponent, TextboxSafeHtmlPipe],
    exports: [TextboxComponent],
})
export class TextboxModule {}
