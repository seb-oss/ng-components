import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button.component";
import { FormsModule } from "@angular/forms";

import { ButtonClassesPipe } from "./button.pipes";

@NgModule({
    declarations: [ButtonComponent, ButtonClassesPipe],
    imports: [CommonModule, FormsModule],
    exports: [ButtonComponent],
})
export class ButtonModule {}
