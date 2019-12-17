import { Component, Input, forwardRef, ViewEncapsulation, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export const CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleComponent),
    multi: true
};

@Component({
    selector: "ac-toggle",
    templateUrl: "./toggle.component.html",
    styleUrls: ["./toggle.component.scss"],
    providers: [CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class ToggleComponent implements ControlValueAccessor, OnInit {
    @Input() name: string;
    @Input() className?: string;
    @Input() label?: string;
    @Input() _id?: string;

    ramdomId: string = "";
    hasFocus: boolean = false;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private innerValue: any = "";
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    ngOnInit() {
        const identifier = Math.floor(Math.random() * 100) + (new Date()).getTime();
        this.ramdomId = this.name ? this.name.replace(" ", "_").concat("_") + identifier : identifier.toString();
    }

    /**
     * set Focus
     */
    setFocus() {
        this.hasFocus = !this.hasFocus;
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
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn: any) { this.onChangeCallback = fn; }
    registerOnTouched(fn: any) { this.onTouchedCallback = fn; }
}
