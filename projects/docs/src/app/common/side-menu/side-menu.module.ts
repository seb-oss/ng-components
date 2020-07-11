import { NgModule } from "@angular/core";
import { SideMenuComponent } from "./side-menu.component";
import { AppCommonModule } from "../app-common.module";
import { TextboxGroupModule } from "@sebgroup/ng-components/textboxGroup";
import { FormsModule } from "@angular/forms";
import { SideMenuSearchPipe } from "./side-menu-search.pipe";

@NgModule({
    declarations: [SideMenuComponent, SideMenuSearchPipe],
    imports: [AppCommonModule, TextboxGroupModule, FormsModule],
    exports: [SideMenuComponent],
})
export class SideMenuModule {}
