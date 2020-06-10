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
            if (labelPositions && index) {
                resolve({ left: labelPositions[index] });
            } else {
                reject();
            }
        });
    }
}
