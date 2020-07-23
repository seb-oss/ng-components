import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccordionComponent } from "./accordion.component";

import { AccordionSafeHtmlPipe } from "./accordion.pipe";
import { DynamicStylePipe } from "./accordion-style.pipe";
@NgModule({
    imports: [CommonModule],
    declarations: [AccordionComponent, AccordionSafeHtmlPipe, DynamicStylePipe],
    exports: [AccordionComponent],
})
export class AccordionModule {}
