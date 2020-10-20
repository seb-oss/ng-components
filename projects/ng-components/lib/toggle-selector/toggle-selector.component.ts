import { Component, OnInit, Input, Provider, forwardRef, QueryList } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { randomId } from "@sebgroup/frontend-tools/randomId";

export type ToggleSelectorType = "single" | "multi";

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

@Component({
    selector: "sebng-toggle-selector",
    templateUrl: "./toggle-selector.component.html",
    styleUrls: ["./toggle-selector.component.scss"],
    providers: [TOGGLE_SELECTOR_CONTROL_VALUE_ACCESSOR],
})
export class ToggleSelectorComponent implements ControlValueAccessor {
    @Input() list: Array<any> = [];
    @Input() name: string = randomId("name");
    @Input() multi?: boolean = false;
    @Input() disabled?: boolean = false;
    @Input() error?: boolean = false;
    @Input() errorMessage?: string;

    value: any;

    get inputType(): string {
        return this.multi ? "checkbox" : "radio";
    }

    // HELPERS ================================
    handleItemOnClick(item: any): void {
        // event.preventDefault();
        console.log("click", item);
        this.onChangeCallback && this.onChangeCallback(item);
        this.onTouchedCallback && this.onTouchedCallback();
    }

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    writeValue(value: any): void {
        this.value = value;
        console.log("writeValue", value);
    }
    registerOnChange(fn: any): void {
        console.log("change");
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        console.log("touched");
        this.onTouchedCallback = fn;
    }
}
