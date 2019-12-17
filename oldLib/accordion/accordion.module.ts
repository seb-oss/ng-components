import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccordionComponent } from "./accordion.component";
import { SafeHtmlPipe } from "./accordion.pipe";

@NgModule({
    imports: [CommonModule],
    declarations: [AccordionComponent, SafeHtmlPipe],
    exports: [AccordionComponent]
})
export class AccordionModule { }
