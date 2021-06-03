import { Component, OnInit } from "@angular/core";
import { ExtendedFormGroup } from "@sebgroup/ng-components/dynamic-form/model/custom-classes/extended-form-group";
import { FormService } from "@sebgroup/ng-components/dynamic-form";
import { RangeSliderLabel, SliderTheme } from "@sebgroup/ng-components/slider";
import { DynamicFormOption } from "@sebgroup/ng-components/dynamic-form/";

@Component({
    selector: "app-slider-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-slider
                    [(ngModel)]="value"
                    [alternative]="extendedFormGroup.value.toggles.alternative"
                    [disabled]="extendedFormGroup.value.toggles.disabled"
                    [step]="step"
                    [showTicks]="extendedFormGroup.value.toggles.showTicks"
                    [theme]="extendedFormGroup.value.dropdowns.theme.value"
                    [tooltipTheme]="extendedFormGroup.value.dropdowns.tooltipTheme.value"
                    [labels]="
                        extendedFormGroup.value.toggles.useCustomLabels
                            ? [
                                  { position: 20, text: 'low' },
                                  { position: 50, text: 'medium' },
                                  { position: 80, text: 'high' }
                              ]
                            : []
                    "
                    [alwaysShowTooltip]="extendedFormGroup.value.toggles.alwaysShowTooltip"
                ></sebng-slider>
            </ng-container>
            <ng-container controls>
                <label>Value</label>
                <sebng-stepper [min]="0" [max]="100" [(ngModel)]="value"></sebng-stepper>

                <label>Step</label>
                <sebng-stepper [min]="0" [max]="100" [(ngModel)]="step"></sebng-stepper>
                <app-dynamic-form [extendedFormGroup]="extendedFormGroup"></app-dynamic-form>
            </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
    providers: [FormService],
})
export class SliderPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/slider/slider.component");
    snippet: string = `<sebng-slider></sebng-slider>`;
    extendedFormGroup: ExtendedFormGroup;
    themeOptions: DynamicFormOption<SliderTheme>[] = [
        { value: "primary", label: "Primary" },
        { value: "inverted", label: "Inverted" },
        { value: "success", label: "Success" },
        { value: "danger", label: "Danger" },
        { value: "warning", label: "Warning" },
        { value: "purple", label: "Purple" },
    ];

    // controls
    value: number = 50;
    step: number = 10;

    constructor(private formService: FormService) {
        document.title = "Slider - SEB Angular Components";
        this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
            {
                key: "dropdowns",
                items: [
                    {
                        key: "theme",
                        controlType: "Dropdown",
                        label: "Theme",
                        value: this.themeOptions[0],
                        options: this.themeOptions,
                    },
                    {
                        key: "tooltipTheme",
                        controlType: "Dropdown",
                        label: "Tooltip theme",
                        value: this.themeOptions[1],
                        options: this.themeOptions,
                    },
                ],
            },
            {
                key: "toggles",
                items: [
                    {
                        key: "alternative",
                        controlType: "Checkbox",
                        label: "Alternative",
                        description: "Use alternative style of the component.",
                        value: false,
                    },
                    {
                        key: "alwaysShowTooltip",
                        controlType: "Checkbox",
                        label: "Show tooltip",
                        description: "Always show value using tooltip.",
                        value: false,
                    },
                    {
                        key: "disabled",
                        controlType: "Checkbox",
                        label: "Disabled",
                        description: "View the component in disabled state.",
                        value: false,
                    },
                    {
                        key: "useCustomLabels",
                        controlType: "Checkbox",
                        label: "Show custom labels.",
                        value: false,
                    },
                    {
                        key: "showTicks",
                        controlType: "Checkbox",
                        rulerKey: "useCustomLabels",
                        condition: true,
                        label: "Show ticks",
                        description: "Show ticks with labels",
                        value: false,
                    },
                ],
            },
        ]);
    }
}
