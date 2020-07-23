import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TooltipComponent } from "./tooltip.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { TooltipDirective } from "./tooltip.directive";
import { TooltipContentComponent } from "./tooltip-content/tooltip-content.component";
@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [TooltipComponent, TooltipContentComponent, TooltipDirective],
    exports: [TooltipComponent, TooltipDirective],
    entryComponents: [TooltipContentComponent],
})
export class TooltipModule {}
