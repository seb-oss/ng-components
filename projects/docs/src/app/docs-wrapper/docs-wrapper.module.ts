import { NgModule } from "@angular/core";
import { DocsWrapperComponent } from "./docs-wrapper.component";
import { CommonModule } from "@angular/common";
import { FooterModule } from "../common/footer/footer.module";
import { SideMenuModule } from "../common/side-menu/side-menu.module";
import { LoaderModule } from "@sebgroup/ng-components/loader";
import { DocsWrapperRoutingModule } from "./docs-wrapper-routing.module";

@NgModule({
    declarations: [DocsWrapperComponent],
    imports: [CommonModule, DocsWrapperRoutingModule, FooterModule, SideMenuModule, LoaderModule],
    exports: [],
})
export class DocsWrapperModule {}
