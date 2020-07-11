import { NgModule } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { IconsModule } from "../icons/icons.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [NavbarComponent],
    imports: [CommonModule, RouterModule, IconsModule],
    exports: [NavbarComponent],
})
export class NavbarModule {}
