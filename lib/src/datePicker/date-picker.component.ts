import { Component, Input, forwardRef, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { UIDate, uiDateToString, padNumber } from "./formatters";

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
    @Input() readonly?: boolean = false;
    @Input() disabled?: boolean = false;
    @Input() min?: NgbDateStruct;
    @Input() max?: NgbDateStruct;
    @Input() id?: string;
    @Input() monthNames: string[] = ["Month", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    get inputRawValue(): string {
        if (this.isValidDate(this.value)) {
            return this.value?.toISOString()?.substr(0, this.monthPicker ? 7 : 10) || "";
        } else {
            return "";
        }
    }
    set inputRawValue(v: string) {
        this.value = new Date(v);
    }

    trySaveDate() {
        const day: number = this.customDay;
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
            const value: number = Number(this.inputRawValue.substr(8, 2));
            this._customDay = value;
            return this._customDay;
        }
        return this._customDay;
    }
    set customDay(v: number) {
        this._customDay = v ? Number(v) : null;
        this.trySaveDate();
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
        this._value = v;
        this.onTouchedCallback && this.onTouchedCallback();
        this.onChangeCallback && this.onChangeCallback(v);
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
        return d && d instanceof Date && !isNaN(d.getTime());
    }

    // isValidUIDate(d: UIDate | string): boolean {
    //     if (typeof d === "string") {
    //         return false;
    //     } else {
    //         return d && !!d.day && !!d.month && !!d.year;
    //     }
    // }

    /** Converts from `string` or `Date` to date `string` with format `yyyy-mm-dd` OR `yyyy-mm`*/
    // toInputDateString(v: string | Date, includeDay: boolean = true): string | null {
    //     const regex: RegExp = /\b([0-9])\b/gm;
    //     const date: Date = v instanceof Date ? v : new Date(v);
    //     const subst: string = `0$1`;

    //     if (this.isValidDate(date)) {
    //         return `${date.getFullYear()}-${date.getMonth() + 1}${includeDay ? `-${date.getDate()}` : ""}`.replace(regex, subst);
    //     }

    //     return null;
    // }

    /** Converts from date `string` with format `yyyy-mm-dd` OR `yyyy-mm` to `Date` object */
    // toDate(v: string | null | UIDate): Date | null {
    //     if (v) {
    //         if (typeof v === "string" && v.length) {
    //             const date: Date = new Date(v);
    //             return this.isValidDate(date) ? date : null;
    //         } else {
    //             return this.toDate(uiDateToString(v as UIDate));
    //         }
    //     }
    //     return null;
    // }

    /** updates a single value (year, month or day) in the UIDate object and returns a new object with that value */
    // updateUIDate = (v: UIDate, k: string, i: number, includeDay: boolean = true): UIDate => {
    //     return { ...v, day: includeDay ? v.day : 1, [k]: i };
    // };

    /** Converts from date `string` with format `yyyy-mm-dd` OR `yyyy-mm` to `UIDate` (object with `UIDate` interface) */
    // toUIDate(v: string | Date): UIDate {
    //     const date: Date = v instanceof Date ? v : new Date(v);
    //     return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    // }

    /*
    changeDate(attribute: "day" | "month" | "year", v: number, resetDay: boolean = false) {
        const date: Date = new Date(this.isValidDate(this.value) ? this.value.getTime() : "0001-01-01");
        // if (v) {
        switch (attribute) {
            case "day":
                date.setDate(v ? v : 1);
                break;
            case "month": {
                if (resetDay) {
                    date.setDate(1);
                }
                date.setMonth(v - 1);
                break;
            }
            case "year":
                date.setFullYear(v ? v : 1);
                break;
            default:
                break;
        }
        this.value = date;
        // } else {
        //     this.value = null;
        // }
    }

    getDate(attribute: "day" | "month" | "year"): number {
        const date: Date = new Date(this.isValidDate(this.value) ? this.value.getTime() : "0001-01-01");
        switch (attribute) {
            case "day":
                return date.getDate() || 1;
            case "month": {
                return date.getMonth() + 1;
            }
            case "year":
                return date.getFullYear() || 1;
            default:
                return 0;
        }
    }
    */
}
