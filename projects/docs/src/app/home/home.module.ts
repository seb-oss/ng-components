import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HttpClientModule } from "@angular/common/http";
import { NavbarModule } from "../common/navbar/navbar.module";
import { AppCommonModule } from "../common/app-common.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    AppCommonModule,
    HttpClientModule,
    NavbarModule
  ],
  exports: []
})
export class HomeModule { }
