import { Component, Input, forwardRef, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { padNumber } from "./formatters";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true,
};

/** Date pickers simplify the task of selecting a date in a visual representation of a calendar. */
@Component({
    selector: "sebng-datepicker",
    templateUrl: "./datepicker.component.html",
    styleUrls: ["./datepicker.component.scss"],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
})
export class DatepickerComponent implements ControlValueAccessor {
    /** Element placeholder */
    @Input() placeholder: string = "yyyy-mm-dd";
    /** Element class name */
    @Input() className?: string;
    /** Property sets whether a datepicker is a month picker  */
    @Input() monthPicker?: boolean = false;
    /** Property sets whether SEB styled datepicker will be rendered despite the browser used */
    @Input() forceCustom?: boolean = false;
    /** Property sets whether datepicker is disabled */
    @Input() disabled?: boolean = false;
    /** Minimum range of date that can be selected */
    @Input() min?: Date;
    /** Maximum range of date that can be selected */
    @Input() max?: Date;

    unitNames: { month: string; day: string; year: string } = {
        month: "Month",
        day: "Day",
        year: "Year",
    };

    private _localeCode: string;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;
    private _customDay: number;
    private _customMonth: number;
    private _customYear: number;
    private _value: Date = null;

    /** Locale of datepicker */
    @Input("localeCode")
    set localeCode(v: string) {
        this._localeCode = v;
        const date: Date = new Date(2012, 0, 5);
        const locale = new Intl.DateTimeFormat(this.localeCode, { month: "long" });
        const rtf: any = this.getRelativeTimeFormat(this.localeCode);
        const localeDateString: string = new Intl.DateTimeFormat(this.localeCode)?.format(date);
        const customPickerOrder: string[] = ["day", "month", "year"].sort((a, b) => {
            const positions: { day: number; month: number; year: number } = {
                day: localeDateString.search(/5/g) || 0,
                month: localeDateString.search(/1/g) || 1,
                year: localeDateString.search(/2012/g) || 2,
            };
            return positions[a] - positions[b];
        });

        customPickerOrder?.map(unit => {
            this.unitNames[unit] =
                rtf
                    ?.formatToParts(1, unit)
                    ?.filter(x => x.type === "literal")[1]
                    ?.value?.trim() || unit;
        });

        this._customPickerOrder = customPickerOrder;
        const monthNames: string[] = [this.unitNames.month];
        [...Array(12)].map((_, i) => {
            date.setMonth(i);
            monthNames.push(locale.format(date));
        });
        this._monthNames = monthNames;
    }
    get localeCode(): string {
        return this._localeCode;
    }

    private _monthNames: string[];
    /** <!-- skip --> */
    get monthNames(): string[] {
        return this._monthNames;
    }

    private _customPickerOrder: string[];
    /** <!-- skip --> */
    get customPickerOrder(): string[] {
        return this._customPickerOrder;
    }

    constructor() {
        const myLocale = this.getLocale();
        this.localeCode = myLocale;
    }

    getLocale(): string {
        return navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
    }

    getRelativeTimeFormat(code: string): any {
        if ((Intl as any)["RelativeTimeFormat"]) {
            return new (Intl as any).RelativeTimeFormat(code);
        }
        return null;
    }

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

    trySaveDate(): void {
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
    /** <!-- skip --> */
    get customDay(): number {
        if (this._customDay === undefined && !!this.inputRawValue) {
            const value: number = this.monthPicker ? 1 : Number(this.inputRawValue.substr(8, 2));
            this._customDay = value;
            return this._customDay;
        }
        return this._customDay;
    }
    /** <!-- skip --> */
    set customDay(v: number) {
        if (!this.monthPicker) {
            this._customDay = v ? Number(v) : null;
            this.trySaveDate();
        }
    }

    get customMonth(): number {
        if (this._customMonth === undefined && !!this.inputRawValue) {
            const value: number = Number(this.inputRawValue.substr(5, 2));
            this._customMonth = value;
            return this._customMonth;
        }
        return this._customMonth;
    }
    /** <!-- skip --> */
    set customMonth(v: number) {
        this._customMonth = v ? Number(v) : null;
        this.trySaveDate();
    }

    get customYear(): number {
        if (this._customYear === undefined && !!this.inputRawValue) {
            const value: number = Number(this.inputRawValue.substr(0, 4));
            this._customYear = value;
            return this._customYear;
        }
        return this._customYear;
    }
    /** <!-- skip --> */
    set customYear(v: number) {
        this._customYear = v ? Number(v) : null;
        this.trySaveDate();
    }

    // get and set accessor----------------------
    get value(): Date | null {
        return this._value;
    }
    /** <!-- skip --> */
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

    isDateInRange(d: Date, success?: () => void, fail?: () => void): void {
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
    writeValue(value: any): void {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    supportsInputOfType(type: "date" | "month"): boolean {
        const input: HTMLInputElement = document.createElement("input");
        input.setAttribute("type", type);

        const notADateValue: string = "not-a-date";
        input.setAttribute("value", notADateValue);

        return input.value !== notADateValue;
    }

    isValidDate(d: Date): boolean {
        return !!(d && d instanceof Date && !isNaN(d.getTime()));
    }
}
