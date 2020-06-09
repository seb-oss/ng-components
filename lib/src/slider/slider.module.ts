import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SliderComponent } from "./slider.component";
import { SliderUpDownComponent } from "./sliderUpDown.component";
import { SliderLabelStylePipe, SliderPreviewPipe } from "./slider.pipes";

@NgModule({
    imports: [CommonModule],
    declarations: [SliderComponent, SliderLabelStylePipe, SliderPreviewPipe, SliderUpDownComponent],
    exports: [SliderComponent],
})
export class SliderModule {}
