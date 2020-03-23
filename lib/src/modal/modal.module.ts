import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SebModalComponent } from "./modal";
import { SebModalService } from "./modal.service";
import { SebModalBackdropComponent } from "./modal.backdrop";
import { SebModalBodyDirective, SebModalFooterDirective, SebModalHeaderDirective, SebModalTitleDirective } from "./modal.directives";

@NgModule({
    imports: [CommonModule],
    declarations: [
        SebModalComponent,
        SebModalBackdropComponent,
        SebModalTitleDirective,
        SebModalHeaderDirective,
        SebModalBodyDirective,
        SebModalFooterDirective,
    ],
    exports: [SebModalTitleDirective, SebModalHeaderDirective, SebModalBodyDirective, SebModalFooterDirective],
    entryComponents: [SebModalComponent, SebModalBackdropComponent],
    providers: [SebModalService],
})
export class SebModalModule {}
