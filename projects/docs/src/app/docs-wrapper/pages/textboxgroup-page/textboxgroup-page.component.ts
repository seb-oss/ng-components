import { Component, OnInit } from "@angular/core";
import { FormService } from "../../../common/dynamic-form/form.service";
import { ExtendedFormGroup } from "../../../common/dynamic-form/model/custom-classes/extended-form-group";

@Component({
    selector: "app-textboxgroup-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-textboxgroup
                    [placeholder]="extendedFormGroup.value.text.placeholder"
                    [disabled]="extendedFormGroup.value.toggles.disabled"
                    [readOnly]="extendedFormGroup.value.toggles.readonly"
                    [minLength]="extendedFormGroup.value.numbers.min"
                    [maxLength]="extendedFormGroup.value.numbers.max"
                    [(ngModel)]="value"
                ></sebng-textboxgroup>
            </ng-container>
            <ng-container controls>
                <app-dynamic-form [extendedFormGroup]="extendedFormGroup"></app-dynamic-form>
            </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
    providers: [FormService],
})
export class TextboxgroupPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/textboxGroup/textboxGroup.component");
    snippet: string = `<sebng-textboxgroup></sebng-textboxgroup>`;
    value: string = "Hello :)";
    extendedFormGroup: ExtendedFormGroup;

    constructor(private formService: FormService) {
        document.title = "Textboxgroup - SEB Angular Components";

        this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
            {
                key: "text",
                items: [{ key: "placeholder", label: "Placeholder", controlType: "Text" }],
            },
            {
                key: "numbers",
                items: [
                    {
                        key: "min",
                        label: "Min",
                        description: "Minimum length of input allowed for the textbox group.",
                        controlType: "Number",
                        value: 1,
                        min: 1,
                        max: 1000,
                    },
                    {
                        key: "max",
                        label: "Max",
                        description: "Maximum length of input allowed for the textbox group.",
                        controlType: "Number",
                        value: 100,
                        min: 1,
                        max: 1000,
                    },
                ],
            },
            {
                key: "toggles",
                items: [
                    {
                        key: "readonly",
                        value: false,
                        controlType: "Checkbox",
                        description: "Property sets whether textbox group is readonly.",
                        label: "Read-only",
                        order: 20,
                    },
                    {
                        key: "disabled",
                        value: false,
                        controlType: "Checkbox",
                        description: "Property sets whether textbox group is disabled.",
                        label: "Disabled",
                        order: 10,
                    },
                ],
            },
        ]);
    }

    ngOnInit(): void {}
}
