import { NgModule } from "@angular/core";
import { ModalComponent } from "./modal.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    exports: [ModalComponent],
    declarations: [ModalComponent]
})
export class ModalModule { }
