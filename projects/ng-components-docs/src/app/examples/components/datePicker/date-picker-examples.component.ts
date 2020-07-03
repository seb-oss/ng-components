import { Component } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { JsonPipe } from "@angular/common";

@Component({
    selector: "app-date-picker-examples",
    templateUrl: "./date-picker-examples.component.html",
    providers: [JsonPipe],
})
export class DatePickerExamplesComponent {
    value: Date;
    wrongInitialValue: NgbDateStruct = { year: -100, month: 20, day: 77 };
    min: NgbDateStruct;
    max: NgbDateStruct;

    constructor() {
        const today: Date = new Date();
        this.value = today;
        // this.value = {
        //     year: today.getFullYear(),
        //     month: today.getMonth() + 1,
        //     day: today.getDate(),
        // };
        // this.min = { ...this.value, month: 1, day: 1 };
        // this.max = { ...this.value, month: 12, day: 31 };
    }
}
