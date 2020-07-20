import { Component } from "@angular/core";
import { FormService } from "../../../common/dynamic-form/form.service";
import { ExtendedFormGroup } from "../../../common/dynamic-form/model/custom-classes/extended-form-group";

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
                <app-dynamic-form [extendedFormGroup]="extendedFormGroup"></app-dynamic-form>
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
                        min: 1,
                        max: 500,
                    },
                    {
                        key: "min",
                        controlType: "Number",
                        label: "Min",
                        description: "Minimum value of the range.",
                        value: 0,
                        min: -1000,
                        max: 0,
                    },
                    {
                        key: "max",
                        controlType: "Number",
                        label: "Max",
                        description: "Maximum value of the range.",
                        value: 100,
                        min: 0,
                        max: 1000,
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
