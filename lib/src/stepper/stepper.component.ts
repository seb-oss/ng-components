import { Component, forwardRef, Input, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

const CUSTOM_STEPPER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StepperComponent),
    multi: true,
};

@Component({
    selector: "seb-stepper",
    templateUrl: "./stepper.component.html",
    styleUrls: ["./stepper.component.scss"],
    providers: [CUSTOM_STEPPER_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
})
export class StepperComponent implements ControlValueAccessor {
    @Input() className?: string;
    @Input() name?: string;
    @Input() min?: number = 1;
    @Input() max?: number = 5;
    @Input() step?: number = 1;
    @Input() disabled?: boolean;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private innerValue: number = 0;

    private onTouchedCallback: () => void;
    private onChangeCallback: (_: number) => void;

    increment(): void {
        if (this.value < this.max && this.value + this.step <= this.max) {
            this.value = this.value + this.step;
        }
    }

    decrement(): void {
        if (this.value > this.min && this.value - this.step >= this.min) {
            this.value = this.value - this.step;
        }
    }

    // get and set accessor----------------------
    get value(): number {
        return this.innerValue;
    }
    set value(v: number) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback && this.onChangeCallback(v);
            this.onTouchedCallback && this.onTouchedCallback();
        }
    }

    // From ControlValueAccessor interfaces--------------
    writeValue(value: number) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
