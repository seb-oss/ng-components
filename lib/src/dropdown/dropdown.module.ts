import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SebDropdownComponent, SebDropdownItemComponent, SebDropdownToggleDirective } from "./dropdown";

@NgModule({
    imports: [CommonModule],
    declarations: [SebDropdownComponent, SebDropdownToggleDirective, SebDropdownItemComponent],
    exports: [SebDropdownComponent, SebDropdownToggleDirective, SebDropdownItemComponent],
})
export class SebDropdownModule {}
