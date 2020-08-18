import { NgModule } from "@angular/core";
import { SideMenuComponent } from "./side-menu.component";
import { TextboxModule } from "@sebgroup/ng-components/textbox";
import { FormsModule } from "@angular/forms";
import { SideMenuSearchPipe } from "./side-menu-search.pipe";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { IconsModule } from "../icons/icons.module";
import { BreakpointService } from "@services/breakpoint.service";

@NgModule({
    declarations: [SideMenuComponent, SideMenuSearchPipe],
    imports: [CommonModule, RouterModule, FormsModule, TextboxModule, IconsModule],
    exports: [SideMenuComponent],
    providers: [BreakpointService],
})
export class SideMenuModule {}
