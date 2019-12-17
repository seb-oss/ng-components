import { Component, Input, forwardRef, ViewEncapsulation, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export interface RadioGroupItem {
    group: string;
    value: any;
    label: string;
    description?: string;
    disabled?: boolean;
}

export const CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true
};

@Component({
    selector: "ac-radio-group",
    styleUrls: ["./radioGroup.component.scss"],
    templateUrl: "./radioGroup.component.html",
    providers: [CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class RadioGroupComponent implements OnInit, ControlValueAccessor {
    @Input() name: string;
    @Input() list: Array<RadioGroupItem>;
    @Input() label?: string;
    @Input() error?: string;
    @Input() className?: string;
    @Input() disableAll?: boolean;
    @Input() inline?: boolean;

    randomIds: Array<string> = [];

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private innerValue: number;
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    ngOnInit() {
        if (this.list) {
            this.randomIds = this.list.map((item: RadioGroupItem) => {
                const identifier = + Math.floor(Math.random() * 100) + (new Date()).getTime();
                return (item && item.label) ? item.label.replace(" ", "_") + identifier : identifier.toString();
            });
        }
    }

    handleChange(value: any): void { this.value = value; }

    // get and set accessor----------------------
    get value(): number {
        return this.innerValue;
    }
    set value(v: number) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    // From ControlValueAccessor interfaces--------------
    writeValue(value: number) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn: any) { this.onChangeCallback = fn; }
    registerOnTouched(fn: any) { this.onTouchedCallback = fn; }
}
