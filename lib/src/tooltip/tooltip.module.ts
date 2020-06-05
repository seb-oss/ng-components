import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TooltipComponent } from "./tooltip.component";
@NgModule({
    imports: [CommonModule],
    declarations: [TooltipComponent],
    exports: [TooltipComponent],
})
export class TooltipModule {}
