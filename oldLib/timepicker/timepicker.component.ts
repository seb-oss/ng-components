import { Component, Input, forwardRef, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export interface TimepickerValue {
    hours: number;
    minutes: number;
    dayperiod: string;
}

export const CUSTOM_TIMEPICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimepickerComponent),
    multi: true
};

@Component({
    selector: "ac-timepicker",
    templateUrl: "./timepicker.component.html",
    styleUrls: ["./timepicker.component.scss"],
    providers: [CUSTOM_TIMEPICKER_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class TimepickerComponent implements ControlValueAccessor {
    @Input() name: string;
    @Input() className?: string;

    angleUp: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" /></svg>`;
    angleDown: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" /></svg>`;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private innerValue: TimepickerValue = { hours: 12, minutes: 0, dayperiod: "AM" };
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: TimepickerValue) => void;

    // get and set accessor----------------------
    get value(): TimepickerValue {
        return this.innerValue;
    }
    set value(v: TimepickerValue) {
        if (v !== this.innerValue) {
            this.innerValue = { ...v };
            this.onChangeCallback(v);
        }
    }

    // From ControlValueAccessor interfaces--------------
    writeValue(value: TimepickerValue) {
        if (value !== this.innerValue) {
            this.innerValue = { ...value };
        }
    }
    registerOnChange(fn: any) { this.onChangeCallback = fn; }
    registerOnTouched(fn: any) { this.onTouchedCallback = fn; }

    handleClick(context: string, type: string, currentValue: TimepickerValue): TimepickerValue {
        const newValue: TimepickerValue = { ...currentValue };
        switch (context) {
            case "HOURS":
                let hours: number = currentValue.hours;
                if (type === "INCREMENT") {
                    if (hours >= 12) {
                        hours = 1;
                    } else {
                        hours++;
                    }
                } else if (type === "DECREMENT") {
                    if (hours <= 1) {
                        hours = 12;
                    } else {
                        hours--;
                    }
                }
                newValue.hours = hours;
                break;
            case "MINUTES":
                let minutes: number = currentValue.minutes;
                if (type === "INCREMENT") {
                    if (minutes >= 59) {
                        minutes = 0;
                    } else {
                        minutes++;
                    }
                } else if (type === "DECREMENT") {
                    if (minutes <= 0) {
                        minutes = 59;
                    } else {
                        minutes--;
                    }
                }
                newValue.minutes = minutes;
                break;
            case "DAYPERIOD":
                let dayperiod: string = currentValue.dayperiod;
                if (type === "INCREMENT" || type === "DECREMENT") {
                    if (dayperiod === "AM") {
                        dayperiod = "PM";
                    } else if (dayperiod === "PM") {
                        dayperiod = "AM";
                    }
                }
                newValue.dayperiod = dayperiod;
                break;
        }
        return newValue;
    }

    handleChange(context: string, value: number): void {
        const newValue: TimepickerValue = { ...this.value };
        if (!isNaN(Number(value))) {
            switch (context) {
                case "HOURS":
                    let hours: number;
                    if (Number(value) > 12) {
                        hours = 12;
                    } else if (Number(value) < 1) {
                        hours = 1;
                    } else {
                        hours = Number(value);
                    }
                    newValue.hours = hours;
                    break;
                case "MINUTES":
                    let minutes: number;
                    if (Number(value) > 59) {
                        minutes = 59;
                    } else if (Number(value) < 0) {
                        minutes = 0;
                    } else {
                        minutes = Number(value);
                    }
                    newValue.minutes = minutes;
                    break;

            }
            this.value = { ...newValue };
        }
    }
}
