import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HttpClientModule } from "@angular/common/http";
import { NavbarModule } from "../common/navbar/navbar.module";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FooterModule } from "../common/footer/footer.module";
import { TechStackModule } from "../common/tech-stack/tech-stack.module";

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule, NavbarModule, FooterModule, TechStackModule],
    exports: [RouterModule],
})
export class HomeModule {}
