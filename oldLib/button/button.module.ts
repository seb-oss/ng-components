import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button.component";
import { SafeHtmlPipe } from "./button.pipe";

@NgModule({
    imports: [CommonModule],
    declarations: [ButtonComponent, SafeHtmlPipe],
    exports: [ButtonComponent]
})
export class ButtonModule { }
