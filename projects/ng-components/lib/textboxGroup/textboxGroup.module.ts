import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TextboxGroupComponent } from "./textboxGroup.component";
import { TextboxGroupSafeHtmlPipe } from "./textboxGroup.pipe";
@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TextboxGroupComponent, TextboxGroupSafeHtmlPipe],
    exports: [TextboxGroupComponent],
})
export class TextboxGroupModule {}
