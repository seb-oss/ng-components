import { Component } from "@angular/core";
import { FormService, RuleType } from "@sebgroup/ng-components/dynamic-form";
import { ExtendedFormGroup } from "@sebgroup/ng-components/dynamic-form/model/custom-classes/extended-form-group";

@Component({
    selector: "app-stepper-page",
    template: `
        <app-doc-page [importString]="importString" [centered]="true">
            <ng-container example>
                <sebng-stepper
                    [min]="extendedFormGroup.value.numbers.min"
                    [max]="extendedFormGroup.value.numbers.max"
                    [step]="extendedFormGroup.value.numbers.step"
                    [disabled]="extendedFormGroup.value.toggles.disabled"
                    [(ngModel)]="value"
                ></sebng-stepper>
            </ng-container>
            <ng-container controls>
                <app-dynamic-form [extendedFormGroup]="extendedFormGroup" [activeStep]="0"></app-dynamic-form>
            </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
    providers: [FormService],
})
export class StepperPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/stepper/stepper.component");
    extendedFormGroup: ExtendedFormGroup;

    // controls
    value: number = 50;

    get snippet(): string {
        const { step, min, max } = this.extendedFormGroup.value.numbers;
        return `<sebng-stepper
    [step]="${step}"
    [min]="${min}"
    [max]="${max}"
    [(ngModel)]="value"
></sebng-stepper>`;
    }

    constructor(private formService: FormService) {
        document.title = "Stepper - SEB Angular Components";
        this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
            {
                key: "numbers",
                items: [
                    {
                        key: "step",
                        controlType: "Number",
                        label: "Step",
                        description: "Value that changes on every increment/decrement.",
                        value: 10,
                        rules: [
                            {
                                type: RuleType.min,
                                message: "min should be higher than",
                                value: 1,
                            },
                            {
                                type: RuleType.max,
                                message: "max should be higher than",
                                value: 500,
                            },
                        ],
                    },
                    {
                        key: "min",
                        controlType: "Number",
                        label: "Min",
                        description: "Minimum value of the range.",
                        value: 0,
                        rules: [
                            {
                                type: RuleType.min,
                                message: "min should be higher than",
                                value: -1000,
                            },
                            {
                                type: RuleType.max,
                                message: "max should be higher than",
                                value: 0,
                            },
                        ],
                    },
                    {
                        key: "max",
                        controlType: "Number",
                        label: "Max",
                        description: "Maximum value of the range.",
                        value: 100,
                        rules: [
                            {
                                type: RuleType.min,
                                message: "min should be higher than",
                                value: 0,
                            },
                            {
                                type: RuleType.max,
                                message: "max should be higher than",
                                value: 1000,
                            },
                        ],
                    },
                ],
            },
            {
                key: "toggles",
                items: [
                    {
                        key: "disabled",
                        controlType: "Checkbox",
                        label: "Disabled",
                        description: "View the component in disabled state.",
                        value: false,
                    },
                ],
            },
        ]);
    }
}
