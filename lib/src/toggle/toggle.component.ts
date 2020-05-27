import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    forwardRef,
    Provider,
    OnInit,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";

const CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleComponent),
    multi: true,
};

@Component({
    selector: "sebng-toggle",
    templateUrl: "./toggle.component.html",
    styleUrls: ["./toggle.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR],
})
export class ToggleComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() className?: string;
    @Input() disabled?: boolean;
    @Input() id?: string;
    @Input() label?: string;
    @Input() name?: string;
    @Output() onChange = new EventEmitter<boolean>();

    public internalId: string;

    setInternalId() {
        this.internalId = this.id ? this.id : randomId("toggle-");
    }

    ngOnInit() {
        this.setInternalId();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.id) {
            this.setInternalId();
        }
    }

    private _value: boolean;

    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    get value(): boolean {
        return this._value;
    }

    set value(v: boolean) {
        if (v !== this._value) {
            this._value = v;
            this.onChangeCallback && this.onChangeCallback(v);
            this.onChange && this.onChange.emit(v);
        }
    }

    // accessor props
    writeValue(val: boolean) {
        this._value = val;
    }

    registerOnChange(fn: () => void): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }
}