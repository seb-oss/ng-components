import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TextLabelComponent } from "./textLabel.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TextLabelComponent
    ],
    exports: [
        TextLabelComponent
    ]
})
export class TextLabelModule { }
