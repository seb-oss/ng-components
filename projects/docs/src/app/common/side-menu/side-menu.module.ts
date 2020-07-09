import { NgModule } from "@angular/core";
import { SideMenuComponent } from "./side-menu.component";
import { AppCommonModule } from "../app-common.module";

@NgModule({
    declarations: [SideMenuComponent],
    imports: [AppCommonModule],
    exports: [SideMenuComponent],
})
export class SideMenuModule { }
