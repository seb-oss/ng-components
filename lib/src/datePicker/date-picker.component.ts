import { Component, Input, forwardRef, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { UIDate, uiDateToString } from "./formatters";

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
    @Input() readonly?: boolean = false;
    @Input() disabled?: boolean = false;
    @Input() min?: NgbDateStruct;
    @Input() max?: NgbDateStruct;
    @Input() id?: string;
    months: string[] = ["Month", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private innerValue: Date = null;
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    // get and set accessor----------------------
    get value(): Date | null {
        return this.innerValue;
    }
    set value(v: Date | null) {
        this.innerValue = v;
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

    /** Converts from `string` or `Date` to date `string` with format `yyyy-mm-dd` OR `yyyy-mm`*/
    toInputDateString(v: string | Date, includeDay: boolean = true): string | null {
        const regex: RegExp = /\b([0-9])\b/gm;
        const date: Date = v instanceof Date ? v : new Date(v);
        const subst: string = `0$1`;

        if (this.isValidDate(date)) {
            return `${date.getFullYear()}-${date.getMonth() + 1}${includeDay ? `-${date.getDate()}` : ""}`.replace(regex, subst);
        }

        return null;
    }

    /** Converts from date `string` with format `yyyy-mm-dd` OR `yyyy-mm` to `Date` object */
    toDate(v: string | null | UIDate): Date | null {
        if (v) {
            if (typeof v === "string" && v.length) {
                const date: Date = new Date(v);
                return this.isValidDate(date) ? date : null;
            } else {
                return this.toDate(uiDateToString(v as UIDate));
            }
        }
        return null;
    }

    updateUIDate = (v: UIDate, k: string, i: number): UIDate => {
        return { ...v, [k]: i };
    };

    toUIDate(v: string | Date): UIDate {
        const date: Date = v instanceof Date ? v : new Date(v);
        if (this.isValidDate(date)) {
            return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
        }
    }
}
