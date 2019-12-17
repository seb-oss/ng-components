import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TextBoxComponent } from "./textBox.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TextBoxComponent
    ],
    exports: [
        TextBoxComponent
    ]
})
export class TextBoxModule { }
