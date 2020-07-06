import { Component, Input, forwardRef, ViewEncapsulation, OnInit, TemplateRef, Output, EventEmitter, Provider } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";

export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: Provider = {
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
export class CheckBoxComponent implements ControlValueAccessor {
    @Input() label: string | TemplateRef<HTMLElement>;
    @Input() _id?: string = randomId("checkbox-");
    @Input() name?: string;
    @Input() className?: string;
    @Input() disabled?: boolean;
    @Input() description?: string | TemplateRef<HTMLElement>;
    @Input() error?: string | TemplateRef<HTMLElement>;
    @Output() onChange?: EventEmitter<boolean> = new EventEmitter<boolean>();

    private innerValue: boolean = false;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    get value(): boolean {
        return this.innerValue;
    }

    set value(v: boolean) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback && this.onChangeCallback(v);
            this.onTouchedCallback && this.onTouchedCallback();
            this.onChange && this.onChange.emit(v);
        }
    }

    // From ControlValueAccessor interface
    writeValue(value: boolean): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: (_: any) => {}): void {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: () => {}): void {
        this.onTouchedCallback = fn;
    }

    /**
     * Check if input parameter is a string
     */
    isString = (input: any): boolean => {
        return typeof input === "string";
    };
}
