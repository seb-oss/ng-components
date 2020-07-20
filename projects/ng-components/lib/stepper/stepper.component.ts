import { Component, forwardRef, Input, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

const CUSTOM_STEPPER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StepperComponent),
    multi: true,
};

/** A stepper makes it easier to input values that are in a narrow range */
@Component({
    selector: "sebng-stepper",
    templateUrl: "./stepper.component.html",
    styleUrls: ["./stepper.component.scss"],
    providers: [CUSTOM_STEPPER_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
})
export class StepperComponent implements ControlValueAccessor {
    /** Element class name */
    @Input() className?: string;
    /** Element ID */
    @Input() id?: string;
    /** Minimum value of the range */
    @Input() min?: number = 1;
    /** Maximum value of the range */
    @Input() max?: number = 5;
    /** Value that changes on every increment/decrement */
    @Input() step?: number = 1;
    /** Property sets whether stepper is disabled */
    @Input() disabled?: boolean;

    private _invalid = false;
    // read-only inner value which holds the state of the current input (valid or not)
    get invalid(): boolean {
        return this._invalid;
    }

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private _value: number = 0;

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
    @Input()
    get value(): number {
        return this._value;
    }
    set value(v: number) {
        this._invalid = false;
        if (v >= this.min && v <= this.max) {
            this._value = Number(v);
        } else {
            this._invalid = true;
        }
        this.onChangeCallback && this.onChangeCallback(this._value);
        this.onTouchedCallback && this.onTouchedCallback();
    }

    // From ControlValueAccessor interfaces--------------
    writeValue(value: number) {
        this.value = value;
    }
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
