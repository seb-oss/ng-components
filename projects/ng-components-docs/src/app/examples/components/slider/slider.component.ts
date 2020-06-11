import { Component, OnInit } from "@angular/core";
import { SliderAppearance, SliderTheme, RangeSliderLabel } from "lib/src/slider/";
import { RadioGroupItem } from "lib/src/public_api";

interface Item<T> {
    label: string;
    value: T;
    key: T;
}

@Component({
    selector: "app-slider",
    templateUrl: "./slider.component.html",
    styleUrls: ["./slider.component.scss"],
})
export class SliderComponent implements OnInit {
    appearanceList: Array<Item<SliderAppearance>> = [];
    themeList: Array<Item<SliderTheme>> = [];
    alwaysShowTooltip: boolean;
    appearance: SliderAppearance;
    disabled: boolean;
    hasError: boolean;
    hasLabels: boolean;
    max: number;
    maxInputError: string;
    min: number;
    minInputError: string;
    showTicks: boolean;
    slider: number;
    sliderLabels: Array<RangeSliderLabel>;
    step: number;
    stepInputError: string;
    theme: SliderTheme;
    tooltipTheme: SliderTheme;
    withInput: boolean;
    withInputError: string;

    ngOnInit() {
        this.themeList = [
            { label: "Danger", value: "danger", key: "danger" },
            { label: "Inverted", value: "inverted", key: "inverted" },
            { label: "Primary", value: "primary", key: "primary" },
            { label: "Purple", value: "purple", key: "purple" },
            { label: "Success", value: "success", key: "success" },
            { label: "Warning", value: "warning", key: "warning" },
        ];

        this.appearanceList = [
            { label: "Normal (new default)", value: "normal", key: "normal" },
            { label: "Alternative (old default)", value: "alternative", key: "alternative" },
        ];

        this.appearance = "normal";
        this.slider = 25;
        this.theme = "primary";
        this.tooltipTheme = "inverted";
        this.disabled = false;
        this.hasError = false;
        this.hasLabels = false;
        this.showTicks = false;
        this.alwaysShowTooltip = false;
        this.withInput = false;
        this.withInputError = "";
        this.min = 0;
        this.minInputError = "";
        this.max = 100;
        this.maxInputError = "";
        this.step = 1;
        this.stepInputError = "";
        this.sliderLabels = [];
    }

    /**
     * Generates labels for the slider
     * @returns {Array<RangeSliderLabel} The generated list of labels
     */
    generateLabels(min: number, max: number): Array<RangeSliderLabel> {
        const size: number = Math.abs(max > min ? max - min : min - max);
        const middle: number = min + Math.ceil(size / 2);
        const list: Array<RangeSliderLabel> = [
            { text: String(min), position: min },
            { text: String(middle), position: middle },
            { text: String(max), position: max },
        ];
        if ((min !== 0 && min < 0 && max > 0) || (max !== 0 && max > 0 && min < 0)) {
            list[1].position !== 0 && list.push({ text: "0", position: 0 });
        }
        return list;
    }

    onRadioChange(value: SliderTheme | RadioGroupItem, name: keyof this) {
        if (value) {
            this[name as any] = typeof value === "object" ? ((value as RadioGroupItem)?.key as SliderTheme) : value;
        } else {
            this[name] = this[name];
        }
    }

    onOptionsChange(value: boolean, name: keyof this) {
        let sliderLabels: Array<RangeSliderLabel>;

        this[name as any] = value;
        if (["min", "max", "hasLabels"].indexOf(name as any) !== -1) {
            const hasLabels = name === "hasLabels" ? this[name] : this.hasLabels;
            sliderLabels = hasLabels ? this.generateLabels(this.min, this.max) : [];
            sliderLabels && (this.sliderLabels = sliderLabels);
        }
    }

    onFormChange(value: number | string | RadioGroupItem, name: string): void {
        const min: number = name === "min" ? Number(value) || 0 : this.min;
        const max: number = name === "max" ? Number(value) || 100 : this.max;

        if (name === "slider") {
            if (this.slider < min) {
                this.withInputError = "Cannot be less the minimum";
            } else if (this.slider > max) {
                this.withInputError = "Cannot exceeded the maximum";
            } else {
                this.withInputError = "";
            }
        }
    }

    onSliderChange(value: number) {
        this.slider = value;
    }
}
