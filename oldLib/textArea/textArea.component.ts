import { Component, Input, forwardRef, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export const CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaComponent),
    multi: true
};

@Component({
    selector: "ac-textarea",
    styleUrls: ["./textArea.component.scss"],
    templateUrl: "./TextArea.component.html",
    providers: [CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class TextAreaComponent implements ControlValueAccessor {
    @Input() name: string;
    @Input() label?: string;
    @Input() error?: string;
    @Input() placeHolder?: string;
    @Input() className?: string;
    @Input() focus?: boolean;
    @Input() readonly?: boolean;
    @Input() disabled?: boolean;
    @Input() cols?: number = 30;
    @Input() rows?: number = 5;
    @Input() resizable?: boolean;
    @Input() max?: number;
    @Input() _id?: string;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private innerValue: any = "";
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

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
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn: any) { this.onChangeCallback = fn; }
    registerOnTouched(fn: any) { this.onTouchedCallback = fn; }
}
