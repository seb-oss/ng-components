import { Component } from "@angular/core";
import { JsonPipe } from "@angular/common";

@Component({
    selector: "app-date-picker-examples",
    templateUrl: "./date-picker-examples.component.html",
    providers: [JsonPipe],
})
export class DatePickerExamplesComponent {
    monthPicker: Date;
    forceCustom: Date;
    value: Date;

    constructor() {
        const today: Date = new Date();
        this.value = today;
    }
}
