import {
    Component,
    Input,
    ViewEncapsulation,
    forwardRef,
    Provider,
    OnChanges,
    SimpleChanges,
    OnInit,
    Output,
    EventEmitter,
} from "@angular/core";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextboxComponent),
    multi: true,
};

type Value = number | string;

/** Textbox is a component that allows user to add or edit text */
@Component({
    selector: "sebng-textbox",
    templateUrl: "./textbox.component.html",
    styleUrls: ["./textbox.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR],
})
export class TextboxComponent implements ControlValueAccessor, OnInit, OnChanges {
    /** Property sets to check if textbox is allowed to auto complete */
    @Input() autocomplete?: string;
    /** Element class name */
    @Input() className?: string;
    /** Property sets whether textbox is disabled */
    @Input() disabled?: boolean;
    /** Error message of textbox */
    @Input() error?: string;
    /** Property sets whether textbox is focused */
    @Input() focus?: boolean;
    /** Element ID */
    @Input() id?: string;
    /** Element label */
    @Input() label?: string;
    /** Element left icon */
    @Input() leftIcon?: string;
    /** Element left text */
    @Input() leftText?: string;
    /** Element left title */
    @Input() leftTitle?: string;
    /** Maximum allowed length for input */
    @Input() maxLength?: number;
    /** Minimum allowed length for input */
    @Input() minLength?: number;
    /** Elemenet name */
    @Input() name: string;
    /** Element pattern */
    @Input() pattern?: string;
    /** Element placeholder */
    @Input() placeholder?: string;
    /** Property sets whether textbox is readonly */
    @Input() readonly?: boolean;
    /** Property sets whether textbox is required */
    @Input() required?: boolean;
    /** Element right icon */
    @Input() rightIcon?: string;
    /** Element right text */
    @Input() rightText?: string;
    /** Element right title */
    @Input() rightTitle?: string;
    /** Input type */
    @Input() type?: string;
    /** Property sets whether textbox is set to success theme */
    @Input() success?: boolean;
    /** Property sets whether error message should be shown */
    @Input() showErrorMessage?: boolean;

    /** Callback when textbox is defocused */
    @Output() onBlur: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /** Callback when textbox's value is changed  */
    @Output() onChange: EventEmitter<Value> = new EventEmitter<Value>();
    /** Callback when textbox is focused  */
    @Output() onFocus: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /** Callback when key is pressed */
    @Output() onKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
    /** Callback when a key that produces a character value is pressed down */
    @Output() onKeyPress: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
    /** Callback when key is released */
    @Output() onKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
    /** Callback when left icon/text button is clicked */
    @Output() onLeftClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /** Callback when right icon/text button is clicked */
    @Output() onRightClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /** Calback when a search is initiated using element of type="search" */
    @Output() onSearch: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    private _value: Value;

    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    public internalId: string;
    public displayError: boolean;

    ngOnInit(): void {
        this.internalId = this.id ? this.id : this.label ? randomId("tbg-") : null;
        this.displayError = false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.id || changes.label) {
            this.internalId = changes.id ? changes.id?.currentValue : randomId("tbg-");
        }

        if (changes.showErrorMessage || changes.success) {
            if (changes.success?.currentValue === true) {
                // Only false when success is enabled
                this.displayError = false;
            } else if (!changes.showErrorMessage?.currentValue) {
                // `showErrorMessage` is set to boolean false
                this.displayError = false;
            } else {
                // If set to true, or it will be defaulted if the value is not passed
                this.displayError = true;
            }
        }
    }

    @Input()
    get value(): Value {
        return this._value;
    }

    set value(v: Value) {
        if (v !== this._value) {
            this._value = v;
            this.onChangeCallback && this.onChangeCallback(v);
            this.onChange && this.onChange.emit(v);
        }
    }

    // event
    handleBlur(e: MouseEvent): void {
        this.onBlur?.emit(e);
    }

    handleKeyUp(e: KeyboardEvent): void {
        this.onKeyUp?.emit(e);
    }

    handleKeyDown(e: KeyboardEvent): void {
        this.onKeyDown?.emit(e);
    }

    handleFocus(e: MouseEvent): void {
        this.onFocus?.emit(e);
    }

    handleKeyPress(e: KeyboardEvent): void {
        this.onKeyPress?.emit(e);
    }

    handleLeftIconClick(e: MouseEvent): void {
        this.onLeftClick?.emit(e);
    }

    handleRightIconClick(e: MouseEvent): void {
        this.onRightClick?.emit(e);
    }

    handleSearch(e: KeyboardEvent): void {
        this.onSearch?.emit(e);
    }
    // accessor props
    writeValue(val: Value): void {
        if (val !== this._value) {
            this._value = val;
        }
    }

    registerOnChange(fn: () => void): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }
}
