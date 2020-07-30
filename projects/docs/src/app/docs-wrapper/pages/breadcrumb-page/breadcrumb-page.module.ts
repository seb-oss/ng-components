import { NgModule } from "@angular/core";
import { BreadcrumbModule } from "@sebgroup/ng-components/breadcrumb";
import { BreadcrumbPageComponent } from "./breadcrumb-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { BreadcrumbPageRoutingModule } from "./breadcrumb-page-routing.module";

@NgModule({
    declarations: [BreadcrumbPageComponent],
    imports: [CommonModule, BreadcrumbPageRoutingModule, FormsModule, DocPageModule, BreadcrumbModule],
})
export class BreadcrumbPageModule {}
