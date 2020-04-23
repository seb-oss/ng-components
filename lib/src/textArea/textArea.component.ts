import { Component, Input, Output, EventEmitter, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "sebng-textArea",
    templateUrl: "./textArea.component.html",
    styleUrls: ["./textArea.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TextAreaComponent {
    @Input() className?: string;
    @Input() cols?: number;
    @Input() disabled?: boolean;
    @Input() error?: string;
    @Input() focus?: boolean;
    @Input() id?: string;
    @Input() label?: string;
    @Input() max?: number;
    @Input() name: string;
    @Input() placeholder?: string;
    @Input() readonly?: boolean;
    @Input() resizable?: boolean;
    @Input() rows?: number;

    @Output() onBlur = new EventEmitter<FocusEvent>();
    @Output() onChange = new EventEmitter<string>();
    @Output() onFocus = new EventEmitter<FocusEvent>();
    @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
    @Output() onKeyPress = new EventEmitter<KeyboardEvent>();
    @Output() onKeyUp = new EventEmitter<KeyboardEvent>();

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

    handleChange(value: string) {
        console.log("The new value is ", value);
        this.onChange?.emit(value);
    }
    // accessor props
    writeValue(val: string) {
        if (val !== this.innerValue) {
            this.innerValue = val;
        }
    }

    registerOnChange(fn: () => void): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }
}
