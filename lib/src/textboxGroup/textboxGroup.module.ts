import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TextboxGroupComponent } from "./textboxGroup.component";
import { SafeHtmlPipe } from "./textboxGroup.pipe";
@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TextboxGroupComponent, SafeHtmlPipe],
    exports: [TextboxGroupComponent],
})
export class TextboxGroupModule {}
