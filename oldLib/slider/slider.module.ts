import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SliderComponent } from "./slider.component";

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [SliderComponent],
    declarations: [SliderComponent]
})
export class SliderModule { }
