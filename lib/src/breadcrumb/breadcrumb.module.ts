import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { SafeHtmlPipe } from "./breadcrumb.pipe";
@NgModule({
    imports: [CommonModule],
    declarations: [BreadcrumbComponent, SafeHtmlPipe],
    exports: [BreadcrumbComponent],
})
export class BreadcrumModule {}
