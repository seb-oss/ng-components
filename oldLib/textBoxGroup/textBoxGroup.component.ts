import { Component, Input, forwardRef, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

const CUSTOM_TEXTBOXGROUP_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextBoxGroupComponent),
    multi: true
};

@Component({
    selector: "ac-textbox-group",
    styleUrls: ["./textBoxGroup.component.scss"],
    templateUrl: "./TextBoxGroup.component.html",
    providers: [CUSTOM_TEXTBOXGROUP_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class TextBoxGroupComponent implements ControlValueAccessor {
    @Input() name: string;
    @Input() type?: string = "text";
    @Input() label?: string;
    @Input() error?: string;
    @Input() placeHolder?: string;
    @Input() className?: string;
    @Input() focus?: boolean;
    @Input() readOnly?: boolean;
    @Input() disabled?: boolean;
    @Input() max?: number;
    @Input() autoComplete?: boolean;
    @Input() _id?: string;

    @Input() leftText?: string;
    @Input() rightText?: string;

    @Input() leftIcon?: string;
    @Input() rightIcon?: string;

    @Input() onRightClick?: (event: MouseEvent) => void;
    @Input() onLeftClick?: (event: MouseEvent) => void;
    @ViewChild("customTextBoxGroup") innerElement: ElementRef;

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
