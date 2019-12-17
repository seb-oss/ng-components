import { NgModule } from "@angular/core";
import { DialogueComponent } from "./dialogue.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    exports: [DialogueComponent],
    declarations: [DialogueComponent]
})
export class DialogueModule { }
