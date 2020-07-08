import { NgModule } from "@angular/core";
import { ModalComponent } from "./modal.component";
import { SebModalBackdropComponent } from "./modal.backdrop";
import { CommonModule } from "@angular/common";
import { ModalService } from "./modal.service";

@NgModule({
    imports: [CommonModule],
    declarations: [ModalComponent, SebModalBackdropComponent],
    exports: [ModalComponent, SebModalBackdropComponent],
    providers: [ModalService],
})
export class ModalModule {}
