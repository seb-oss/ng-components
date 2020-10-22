import { Component, Input, Provider, forwardRef, Pipe, PipeTransform } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { randomId } from "@sebgroup/frontend-tools/randomId";

export type InputType = "checkbox" | "radio";

export interface IToggleSelector {
    value: string;
    label?: string;
    description?: string;
    disabled?: boolean;
}

const TOGGLE_SELECTOR_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSelectorComponent),
    multi: true,
};

/** The Toggle selector emphasizes to the user that this is an important choice. We also think it can make choosing more attractive. */
@Component({
    selector: "sebng-toggle-selector",
    templateUrl: "./toggle-selector.component.html",
    styleUrls: ["./toggle-selector.component.scss"],
    providers: [TOGGLE_SELECTOR_CONTROL_VALUE_ACCESSOR],
})
export class ToggleSelectorComponent implements ControlValueAccessor {
    @Input() list: Array<any> = [];
    @Input() name?: string = randomId("name");
    @Input() multi?: boolean = false;
    @Input() disabled?: boolean = false;
    @Input() error?: boolean = false;
    @Input() errorMessage?: string;

    /** internal value */
    value: any;

    get inputType(): InputType {
        return this.multi ? "checkbox" : "radio";
    }

    // HELPERS ================================
    handleItemOnClick(item: any, idx: number): void {
        if (this.value?.value !== item.value) {
            item.checked = !item.checked;
            !this.multi ? (this.value = item) : (this.value[idx] = item);
            this.onChangeCallback && this.onChangeCallback(item);
            this.onTouchedCallback && this.onTouchedCallback();
        }
    }

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    writeValue(value: any): void {
        this.value = value;
        console.log("writeValue", value, this.value);
    }
    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }
}

@Pipe({
    name: "checked",
})
export class CheckedPipe implements PipeTransform {
    transform(value: any, item: any, multi: boolean): boolean {
        return !multi
            ? value?.value === item.value
            : value?.find((element: any) => element.value === item.value && element.checked === true);
    }
}
