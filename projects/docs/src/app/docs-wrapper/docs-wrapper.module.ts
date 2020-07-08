import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocsWrapperComponent } from "./docs-wrapper.component";
import { SideMenuModule } from "../common/side-menu/side-menu.module";
import { RouterModule } from "@angular/router";
import { FooterModule } from "../common/footer/footer.module";

@NgModule({
  declarations: [DocsWrapperComponent],
  imports: [
    CommonModule,
    SideMenuModule,
    RouterModule,
    FooterModule
  ]
})
export class DocsWrapperModule { }
