import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, Provider } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { randomId } from "@sebgroup/frontend-tools";

const CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleComponent),
    multi: true,
};
/** A Slide toggle allows the user to change between two states */
@Component({
    selector: "sebng-toggle",
    templateUrl: "./toggle.component.html",
    styleUrls: ["./toggle.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR],
})
export class ToggleComponent implements ControlValueAccessor {
    /** Element class name */
    @Input() className?: string;
    /** Element disabled state */
    @Input() disabled?: boolean;
    /** Element ID */
    @Input()
    get id(): string {
        return this._id;
    }

    set id(v: string) {
        console.log(v);
        this._id = v || randomId("toggle-");
    }
    /** Element label */
    @Input() label?: string;
    /** Element name */
    @Input() name?: string;

    /** Element value. Use ngModel for two-way data binding */
    @Input()
    get value(): boolean {
        return this._value;
    }

    set value(v: boolean) {
        if (v !== this._value) {
            this._value = v;
            this.onChangeCallback && this.onChangeCallback(v);
            this.valueChange && this.valueChange.emit(v);
        }
    }
    /** On change event which returns boolean */
    @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _value: boolean;
    private _id: string = randomId("toggle-");

    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    // accessor props
    writeValue(val: boolean): void {
        this._value = val;
    }

    registerOnChange(fn: () => void): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }
}
