import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SliderComponent } from "./slider.component";
import { SliderUpDownComponent } from "./sliderUpDown.component";
import { SliderLabelStylePipe, SliderPreviewPipe, SliderErrorStylePipe } from "./slider.pipes";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [SliderComponent, SliderLabelStylePipe, SliderPreviewPipe, SliderErrorStylePipe, SliderUpDownComponent],
    exports: [SliderComponent],
})
export class SliderModule {}
