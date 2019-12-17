import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginationComponent } from "./pagination.component";
import { SafeHtmlPipe } from "./pagination.pipe";

@NgModule({
    imports: [CommonModule],
    exports: [PaginationComponent],
    declarations: [PaginationComponent, SafeHtmlPipe]
})
export class PaginationModule { }
