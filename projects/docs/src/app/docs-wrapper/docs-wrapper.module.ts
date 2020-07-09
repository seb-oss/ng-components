import { NgModule } from "@angular/core";
import { DocsWrapperComponent } from "./docs-wrapper.component";
import { SideMenuModule } from "../common/side-menu/side-menu.module";
import { RouterModule } from "@angular/router";
import { AppCommonModule } from "../common/app-common.module";

@NgModule({
  declarations: [DocsWrapperComponent],
  imports: [
    AppCommonModule,
    SideMenuModule,
    RouterModule,
  ]
})
export class DocsWrapperModule { }
