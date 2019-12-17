import { Component, Input, forwardRef, ViewEncapsulation, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxComponent),
    multi: true
};

@Component({
    selector: "ac-checkbox",
    templateUrl: "./checkBox.component.html",
    styleUrls: ["./checkBox.component.scss"],
    providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class CheckBoxComponent implements ControlValueAccessor, OnInit {
    @Input() name?: string;
    @Input() changeAction?: (event: any) => void;
    @Input() className?: string;
    @Input() label: string;
    @Input() topLabel?: string;
    @Input() disabled?: boolean;
    @Input() inline?: boolean;
    @Input() description?: string;
    @Input() error?: string;
    @Input() _id?: string;

    id: string;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private innerValue: any = "";
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    ngOnInit() {
        this.id = this._id ? this._id : this.randomId("checkbox-");

        if (!this.label) {
            console.warn("The checkbox component needs a label");
        }
    }

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

    /**
     * Generates random ID
     * @param {string} seed The seed to be injected at the front of the generated random ID
     * @returns {string} The generated random ID
     */
    randomId(seed: string): string {
        return seed + String((Math.random() * 1000) + (new Date()).getTime());
    }
}
