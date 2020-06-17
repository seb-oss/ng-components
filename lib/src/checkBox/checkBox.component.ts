import { Component, Input, forwardRef, ViewEncapsulation, OnInit, TemplateRef, Output, EventEmitter } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, CheckboxControlValueAccessor } from "@angular/forms";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";

export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxComponent),
    multi: true,
};

@Component({
    selector: "sebng-checkbox",
    templateUrl: "./checkBox.component.html",
    styleUrls: ["./checkBox.component.scss"],
    providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
})
export class CheckBoxComponent implements CheckboxControlValueAccessor, OnInit {
    @Input() name?: string;
    @Input() className?: string;
    @Input() label: string | TemplateRef<HTMLElement>;
    @Input() description?: string | TemplateRef<HTMLElement>;
    @Input() disabled?: boolean;
    @Input() inline?: boolean;
    @Input() error?: string | TemplateRef<HTMLElement>;
    @Input() _id?: string;
    // @Output() onChange?: EventEmitter<Event> = new EventEmitter();

    id: string;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private innerValue: boolean = false;
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    ngOnInit(): void {
        this.id = this._id || randomId("checkbox-");
    }

    // get and set accessor----------------------
    get value(): boolean {
        return this.innerValue;
    }

    set value(v: boolean) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            // this.onChangeCallback && this.onChangeCallback(v);
            // this.onTouchedCallback && this.onTouchedCallback();
            // this.onChange && this.onChange.emit(event);
        }
    }

    onChange: (_: any) => void;
    onTouched: () => void;

    // From ControlValueAccessor interfaces--------------
    writeValue(value: boolean): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: () => {}): void {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        throw new Error("Method not implemented.");
    }

    /**
     * Check if input parameter is a string
     */
    isString = (input: any): boolean => {
        return typeof input === "string";
    };
}
