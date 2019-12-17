import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { StepperComponent } from "./stepper.component";

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [StepperComponent],
    declarations: [StepperComponent]
})
export class StepperModule { }
