import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextLabelComponent } from "./textLabel.component";

@NgModule({
    declarations: [TextLabelComponent],
    imports: [CommonModule],
    exports: [TextLabelComponent],
})
export class TextLabelModule {}
