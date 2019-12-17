import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TextBoxGroupComponent } from "./textBoxGroup.component";
import { SafeHtmlPipe } from "./textBoxGroup.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TextBoxGroupComponent,
        SafeHtmlPipe
    ],
    exports: [
        TextBoxGroupComponent
    ]
})
export class TextBoxGroupModule { }
