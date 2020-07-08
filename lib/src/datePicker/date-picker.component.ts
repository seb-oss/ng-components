import { Component, Input, forwardRef, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { padNumber } from "./formatters";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true,
};

@Component({
    selector: "sebng-date-picker",
    templateUrl: "./date-picker.component.html",
    styleUrls: ["./date-picker.component.scss"],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent implements ControlValueAccessor {
    @Input() placeholder: string = "yyyy-mm-dd";
    @Input() className?: string;
    @Input() monthPicker?: boolean = false;
    @Input() forceCustom?: boolean = false;
    @Input() disabled?: boolean = false;
    @Input() min?: Date;
    @Input() max?: Date;
    @Input() monthNames: string[] = ["Month", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    get inputRawValue(): string {
        return this.getStringFromDate(this.value);
    }
    set inputRawValue(v: string) {
        this.value = new Date(v);
    }

    getStringFromDate(d: Date): string {
        if (this.isValidDate(d)) {
            return d?.toISOString()?.substr(0, this.monthPicker ? 7 : 10) || "";
        } else {
            return "";
        }
    }

    trySaveDate() {
        const day: number = this.monthPicker ? 1 : this.customDay;
        const month: number = this.customMonth;
        const year: number = this.customYear;
        const dateString: string = `${padNumber(year, true)}-${padNumber(month)}-${padNumber(day)}`;
        const date: Date = new Date(dateString);
        const m: number = date.getMonth() + 1;
        if (date.getFullYear() === year && m === month && date.getDate() === day) {
            this.value = date;
        } else {
            this.value = new Date("");
        }
    }

    private _customDay: number;
    get customDay(): number {
        if (this._customDay === undefined) {
            const value: number = this.monthPicker ? 1 : Number(this.inputRawValue.substr(8, 2));
            this._customDay = value;
            return this._customDay;
        }
        return this._customDay;
    }
    set customDay(v: number) {
        if (!this.monthPicker) {
            this._customDay = v ? Number(v) : null;
            this.trySaveDate();
        }
    }

    private _customMonth: number;
    get customMonth(): number {
        if (this._customMonth === undefined) {
            const value: number = Number(this.inputRawValue.substr(5, 2));
            this._customMonth = value;
            return this._customMonth;
        }
        return this._customMonth;
    }
    set customMonth(v: number) {
        this._customMonth = v ? Number(v) : null;
        this.trySaveDate();
    }

    private _customYear: number;
    get customYear(): number {
        if (this._customYear === undefined) {
            const value: number = Number(this.inputRawValue.substr(0, 4));
            this._customYear = value;
            return this._customYear;
        }
        return this._customYear;
    }
    set customYear(v: number) {
        this._customYear = v ? Number(v) : null;
        this.trySaveDate();
    }

    private _value: Date = null;
    // get and set accessor----------------------
    get value(): Date | null {
        return this._value;
    }
    set value(v: Date | null) {
        this.isDateInRange(
            v,
            () => {
                this._value = v;
            },
            () => {
                this._value = new Date("");
            }
        );
        this.onTouchedCallback && this.onTouchedCallback();
        this.onChangeCallback && this.onChangeCallback(this._value);
    }

    isDateInRange(d: Date, success?: () => void, fail?: () => void) {
        if (!this.min && !this.max) {
            success && success();
        } else if (this.min && d >= this.min) {
            if (!this.max || (this.max && d <= this.max)) {
                success && success();
            } else {
                fail && fail();
            }
        } else if (this.max && d <= this.max) {
            if (!this.min || (this.min && d >= this.min)) {
                success && success();
            } else {
                fail && fail();
            }
        } else {
            fail && fail();
        }
    }

    // From ControlValueAccessor interfaces--------------
    writeValue(value: any) {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    supportsInputOfType(type: "date" | "month"): boolean {
        let input: HTMLInputElement = document.createElement("input");
        input.setAttribute("type", type);

        const notADateValue: string = "not-a-date";
        input.setAttribute("value", notADateValue);

        return input.value !== notADateValue;
    }

    isValidDate(d: Date): boolean {
        return !!(d && d instanceof Date && !isNaN(d.getTime()));
    }
}
