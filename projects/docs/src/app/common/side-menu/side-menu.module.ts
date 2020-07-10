import { NgModule } from "@angular/core";
import { SideMenuComponent } from "./side-menu.component";
import { AppCommonModule } from "../app-common.module";
import { TextboxGroupModule } from "@sebgroup/ng-components/textboxGroup";

@NgModule({
    declarations: [SideMenuComponent],
    imports: [AppCommonModule, TextboxGroupModule],
    exports: [SideMenuComponent],
})
export class SideMenuModule {}
