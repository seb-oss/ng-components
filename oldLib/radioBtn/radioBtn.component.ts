import { Component, Input, forwardRef, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioBtnComponent),
    multi: true
};

@Component({
    selector: "ac-radio-btn",
    templateUrl: "./radioBtn.component.html",
    styleUrls: ["./radioBtn.component.scss"],
    providers: [CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class RadioBtnComponent implements ControlValueAccessor {
    @Input() group: string;
    @Input() label: string;
    @Input() radioValue: any;
    @Input() description?: string;
    @Input() disabled?: boolean;
    @Input() className?: string;
    @Input() inline?: boolean;
    @Input() error?: string;

    private innerValue: any = "";
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    handleChange(value: any): void { this.value = value; }

    // get and set accessor----------------------
    get value(): any {
        return this.innerValue;
    }
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    // From ControlValueAccessor interfaces--------------
    writeValue(value: any): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn: any): void { this.onChangeCallback = fn; }
    registerOnTouched(fn: any): void { this.onTouchedCallback = fn; }
}
