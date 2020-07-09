import { NgModule } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { AppCommonModule } from "../app-common.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [AppCommonModule],
  exports: [NavbarComponent]
})
export class NavbarModule { }
