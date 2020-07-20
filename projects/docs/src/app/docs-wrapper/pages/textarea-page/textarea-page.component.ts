import { Component, OnInit } from "@angular/core";
import { FormService } from "../../../common/dynamic-form/form.service";
import { ExtendedFormGroup } from "../../../common/dynamic-form/model/custom-classes/extended-form-group";

@Component({
    selector: "app-textarea-page",
    template: `
        <app-doc-page [importString]="importString" [centered]="true">
            <ng-container example>
                <sebng-textarea
                    [placeholder]="extendedFormGroup.value.text.placeholder"
                    [resizable]="extendedFormGroup.value.toggles.resizable"
                    [disabled]="extendedFormGroup.value.toggles.disabled"
                    [readonly]="extendedFormGroup.value.toggles.readonly"
                    [cols]="extendedFormGroup.value.numbers.cols"
                    [rows]="extendedFormGroup.value.numbers.rows"
                    [max]="extendedFormGroup.value.numbers.max"
                    [(ngModel)]="value"
                ></sebng-textarea>
            </ng-container>
            <ng-container controls>
                <app-dynamic-form [extendedFormGroup]="extendedFormGroup"></app-dynamic-form>
            </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
    providers: [FormService],
})
export class TextareaPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/textarea/textarea.component");
    snippet: string = `<sebng-textarea></sebng-textarea>`;
    value: string = "";
    extendedFormGroup: ExtendedFormGroup;

    constructor(private formService: FormService) {
        document.title = "Textarea - SEB Angular Components";

        this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
            {
                key: "text",
                items: [{ key: "placeholder", label: "Placeholder", controlType: "Text" }],
            },
            {
                key: "numbers",
                items: [
                    {
                        key: "cols",
                        label: "Columns",
                        description: "The visible width of the textarea.",
                        controlType: "Number",
                        value: 22,
                        min: 1,
                        max: 80,
                    },
                    {
                        key: "rows",
                        label: "Rows",
                        description: "The visible height of the textarea.",
                        controlType: "Number",
                        value: 6,
                        min: 1,
                        max: 20,
                    },
                    {
                        key: "max",
                        label: "Max",
                        description: "Maximum length of input allowed for the textarea.",
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
                        key: "resizable",
                        value: true,
                        controlType: "Checkbox",
                        description: "Property sets whether textarea is resizable.",
                        label: "Resizable",
                        order: 5,
                    },
                    {
                        key: "readonly",
                        value: false,
                        controlType: "Checkbox",
                        description: "Property sets whether textarea is readonly.",
                        label: "Read-only",
                        order: 20,
                    },
                    {
                        key: "disabled",
                        value: false,
                        controlType: "Checkbox",
                        description: "Property sets whether textarea is disabled/",
                        label: "Disabled",
                        order: 10,
                    },
                ],
            },
        ]);
    }

    ngOnInit(): void {}
}
