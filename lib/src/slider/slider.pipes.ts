import { Pipe, PipeTransform } from "@angular/core";
import { SliderTheme, RangeSliderLabel } from "./slider.component";

@Pipe({ name: "sliderPreviewClasses" })
export class SliderPreviewPipe implements PipeTransform {
    transform(alwaysShowTooltip: boolean, tooltipTheme: SliderTheme) {
        return {
            "always-show": alwaysShowTooltip,
            inverted: !tooltipTheme,
            [tooltipTheme]: !!tooltipTheme,
        };
    }
}

@Pipe({ name: "sliderLabelStyle" })
export class SliderLabelStylePipe implements PipeTransform {
    transform(labelPositions: Array<RangeSliderLabel>, index: number) {
        return new Promise((resolve: (reason: any) => void, reject: () => void) => {
            if (labelPositions) {
                resolve({ left: labelPositions[index] });
            } else {
                resolve({ left: 0 });
            }
        });
    }
}

@Pipe({ name: "sliderErrorStyle" })
export class SliderErrorStylePipe implements PipeTransform {
    transform(height: number) {
        return new Promise((resolve: (reason: any) => void, reject: () => void) => {
            resolve({
                overflow: "hidden",
                height: height + "0px",
                opacity: height ? 1 : 0,
                transition: "height 200ms linear, opacity 400ms linear",
            });
        });
    }
}
