import { NgModule } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { IconsModule } from "../icons/icons.module";
import { RouterModule } from "@angular/router";
import { CollapseModule } from "@sebgroup/ng-components/collapse";
import { BreakpointService } from "@services/breakpoint.service";

@NgModule({
    declarations: [NavbarComponent],
    imports: [CommonModule, RouterModule, IconsModule, CollapseModule],
    exports: [NavbarComponent],
    providers: [BreakpointService],
})
export class NavbarModule {}
