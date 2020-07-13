import { NgModule } from "@angular/core";
import { ModalComponent } from "./modal.component";
import { SebModalBackdropModule } from "./modal.backdrop";
import { CommonModule } from "@angular/common";
import { ModalService } from "./modal.service";

@NgModule({
    imports: [CommonModule, SebModalBackdropModule],
    declarations: [ModalComponent],
    exports: [ModalComponent],
    providers: [ModalService],
})
export class ModalModule {}
