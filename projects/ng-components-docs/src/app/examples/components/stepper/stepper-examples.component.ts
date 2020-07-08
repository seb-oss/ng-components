import { Component } from "@angular/core";

@Component({
    selector: "app-stepper-examples",
    templateUrl: "./stepper-examples.component.html",
})
export class StepperExamplesComponent {
    control: number = 5;
    control1: number = 5;
    errorControl: number = -99;
}
