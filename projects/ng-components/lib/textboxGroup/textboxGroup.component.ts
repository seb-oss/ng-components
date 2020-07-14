import {
    Component,
    Input,
    ViewEncapsulation,
    ElementRef,
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
    useExisting: forwardRef(() => TextboxGroupComponent),
    multi: true,
};

type Value = number | string;

@Component({
    selector: "sebng-textboxgroup",
    templateUrl: "./textboxGroup.component.html",
    styleUrls: ["./textboxGroup.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR],
})
export class TextboxGroupComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() autoComplete?: "on" | "off";
    @Input() className?: string;
    @Input() disabled?: boolean;
    @Input() error?: string;
    @Input() focus?: boolean;
    @Input() id?: string;
    @Input() label?: string;
    @Input() leftIcon?: string;
    @Input() leftText?: string;
    @Input() leftTitle?: string;
    @Input() maxLength?: number;
    @Input() minLength?: number;
    @Input() name: string;
    @Input() pattern?: string;
    @Input() placeholder?: string;
    @Input() readOnly?: boolean;
    @Input() required?: boolean;
    @Input() rightIcon?: string;
    @Input() rightText?: string;
    @Input() rightTitle?: string;
    @Input() type?: string;
    @Input() success?: boolean;
    @Input() showErrorMessage?: boolean;

    @Output() onBlur = new EventEmitter<MouseEvent>();
    @Output() onChange = new EventEmitter<Value>();
    @Output() onFocus = new EventEmitter<MouseEvent>();
    @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
    @Output() onKeyPress = new EventEmitter<KeyboardEvent>();
    @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
    @Output() onLeftClick = new EventEmitter<MouseEvent>();
    @Output() onRightClick = new EventEmitter<MouseEvent>();

    private innerValue: Value;

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

    get value(): Value {
        return this.innerValue;
    }

    set value(v: Value) {
        if (v !== this.innerValue) {
            this.innerValue = v;
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
    // accessor props
    writeValue(val: Value): void {
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
