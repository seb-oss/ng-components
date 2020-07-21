import { NgModule } from "@angular/core";
import { DocsWrapperComponent } from "./docs-wrapper.component";
import { RouterModule } from "@angular/router";
import { DOCS_ROUTES } from "./docs-wrapper.routes";
import { CommonModule } from "@angular/common";
import { FooterModule } from "../common/footer/footer.module";
import { SideMenuModule } from "../common/side-menu/side-menu.module";
import { LoaderModule } from "@sebgroup/ng-components/loader";

@NgModule({
    declarations: [DocsWrapperComponent],
    imports: [CommonModule, RouterModule.forChild(DOCS_ROUTES), FooterModule, SideMenuModule, LoaderModule],
    exports: [LoaderModule],
})
export class DocsWrapperModule {}
