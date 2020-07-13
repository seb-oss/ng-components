import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccordionComponent } from "./accordion.component";

import { SafeHtmlPipe } from "./accordion.pipe";
import { DynamicStylePipe } from "./accordion-style.pipe";
@NgModule({
    imports: [CommonModule],
    declarations: [AccordionComponent, SafeHtmlPipe, DynamicStylePipe],
    exports: [AccordionComponent],
})
export class AccordionModule {}
