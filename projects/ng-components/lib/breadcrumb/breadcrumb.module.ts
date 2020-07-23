import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { BreadcrumbSafeHtmlPipe } from "./breadcrumb.pipe";
@NgModule({
    imports: [CommonModule],
    declarations: [BreadcrumbComponent, BreadcrumbSafeHtmlPipe],
    exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
