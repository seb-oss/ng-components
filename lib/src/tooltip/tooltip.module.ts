import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TooltipComponent } from "./tooltip.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { TooltipDirective } from "./tooltip.directive";
@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [TooltipComponent, TooltipDirective],
    exports: [TooltipComponent, TooltipDirective],
})
export class TooltipModule {}
