import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, Provider } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

const CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true,
};

/** Textarea is a component that allows user to add or edit text in multiline */
@Component({
    selector: "sebng-textarea",
    templateUrl: "./textArea.component.html",
    styleUrls: ["./textArea.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR],
})
export class TextareaComponent implements ControlValueAccessor {
    /** Element class name */
    @Input() className?: string;
    /** The visible width of the textarea. It must be a positive integer. */
    @Input() cols?: number;
    /** Property sets whether textarea is disabled */
    @Input() disabled?: boolean;
    /** Error message related to element */
    @Input() error?: string;
    /** Property sets whether textarea is focused */
    @Input() focus?: boolean;
    /** Element ID */
    @Input() id?: string;
    /** Element label */
    @Input() label?: string;
    /** Maximum length of input allowed for the textarea */
    @Input() max?: number;
    /** Name of textarea */
    @Input() name: string;
    /** Element placeholder */
    @Input() placeholder?: string;
    /** Property sets whether textarea is readonly */
    @Input() readonly?: boolean;
    /** Property sets whether textarea is resizable */
    @Input() resizable?: boolean;
    /** The visible height of the textarea. It must be a positive integer. */
    @Input() rows?: number;

    /** Callback when textarea is defocused */
    @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    /** Callback when value of textarea is changed */
    @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
    /** Callback when textarea is focused */
    @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    /** Callback when key is pressed */
    @Output() onKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
    /** Callback when a key that produces a character value is pressed down */
    @Output() onKeyPress: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
    /** Callback when key is released */
    @Output() onKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    private innerValue: string;

    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    get value(): string {
        return this.innerValue;
    }

    set value(v: string) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback && this.onChangeCallback(v);
            this.onChange && this.onChange.emit(v);
        }
    }

    // event
    handleBlur(e: MouseEvent) {
        this.onBlur?.emit(e);
    }

    handleKeyUp(e: KeyboardEvent) {
        this.onKeyUp?.emit(e);
    }

    handleKeyDown(e: KeyboardEvent) {
        this.onKeyDown?.emit(e);
    }

    handleFocus(e: MouseEvent) {
        this.onFocus?.emit(e);
    }

    handleKeyPress(e: KeyboardEvent) {
        this.onKeyPress?.emit(e);
    }

    // accessor props
    writeValue(val: string) {
        this.innerValue = val;
    }

    registerOnChange(fn: () => void): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }
}
