import { Component, Input, forwardRef, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export interface RangeSliderLabel {
    position: number;
    text: string;
}

export const CUSTOM_SLIDER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
};

@Component({
    selector: "ac-slider",
    templateUrl: "./slider.component.html",
    styleUrls: ["./slider.component.scss"],
    providers: [CUSTOM_SLIDER_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements ControlValueAccessor {
    @Input() min?: number = 0;
    @Input() max?: number = 10;
    @Input() step?: number = 1;
    @Input() className?: string;
    @Input() labels?: Array<RangeSliderLabel>;
    @Input() showTicks?: boolean;
    @Input() theme?: string = "primary";
    @Input() tooltipTheme?: string = "inverted";
    @Input() alwaysShowTooltip?: boolean;
    @Input() alternative?: boolean;
    @Input() label?: string;
    @Input() error?: string;
    @Input() _id?: string;

    selectedWidth: number = 0;
    notSelectedWidth: number = 100;
    private innerValue: number = 0;

    /**
     * Converts the current value to percentage based on min and max
     * @param {number} num value to be converted to percentage
     * @returns {number} The precentage
     */
    getPercentage: (num: number) => number = (num: number): number => ((num - this.min) / (this.max - this.min)) * 100;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: any) => void = () => { };

    // get and set accessor----------------------
    get value(): number {
        return this.innerValue;
    }
    set value(v: number) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    // From ControlValueAccessor interfaces--------------
    writeValue(value: number): void {
        if (value) { this.selectedWidth = this.getPercentage(value); }
        if (value && !isNaN(value) && value !== this.innerValue) {
            this.innerValue = value;
        } else {
            if (this.min && !isNaN(this.min)) {
                this.innerValue = this.min;
            } else { this.innerValue = 0; }
        }
    }
    registerOnChange(fn: any): void { this.onChangeCallback = fn; }
    registerOnTouched(fn: any): void { this.onTouchedCallback = fn; }
}
