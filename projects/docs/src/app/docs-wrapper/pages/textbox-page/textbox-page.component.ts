import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { FormService } from "../../../common/dynamic-form/form.service";
import { ExtendedFormGroup } from "../../../common/dynamic-form/model/custom-classes/extended-form-group";

@Component({
    selector: "app-textbox-page",
    template: `
        <app-doc-page [importString]="importString" [centered]="true">
            <ng-container example>
                <sebng-textbox
                    [id]="'Textbox-example'"
                    [label]="extendedFormGroup.value.text.label"
                    [placeholder]="extendedFormGroup.value.text.placeholder"
                    [disabled]="extendedFormGroup.value.toggles.disabled"
                    [readonly]="extendedFormGroup.value.toggles.readonly"
                    [required]="extendedFormGroup.value.toggles.required"
                    [minLength]="extendedFormGroup.value.numbers.min"
                    [maxLength]="extendedFormGroup.value.numbers.max"
                    [leftIcon]="
                        extendedFormGroup.value.dropdowns.left?.label === 'Icon' ? extendedFormGroup.value.dropdowns.left?.value : null
                    "
                    [leftTemplate]="
                        extendedFormGroup.value.dropdowns.left?.label === 'Template' ? extendedFormGroup.value.dropdowns.left?.value : null
                    "
                    [leftText]="
                        extendedFormGroup.value.dropdowns.left?.label === 'Text' ? extendedFormGroup.value.dropdowns.left?.value : null
                    "
                    [rightIcon]="
                        extendedFormGroup.value.dropdowns.right?.label === 'Icon' ? extendedFormGroup.value.dropdowns.right?.value : null
                    "
                    [rightTemplate]="
                        extendedFormGroup.value.dropdowns.right?.label === 'Template'
                            ? extendedFormGroup.value.dropdowns.right?.value
                            : null
                    "
                    [rightText]="
                        extendedFormGroup.value.dropdowns.right?.label === 'Text' ? extendedFormGroup.value.dropdowns.right?.value : null
                    "
                    [(ngModel)]="value"
                >
                    <sebng-loader rightTemplate size="md" toggle="true" className="text-success"></sebng-loader>
                    <sebng-loader leftTemplate size="md" toggle="true" className="text-success"></sebng-loader>
                </sebng-textbox>
            </ng-container>
            <ng-container controls>
                <app-dynamic-form [extendedFormGroup]="extendedFormGroup"></app-dynamic-form>
            </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
    providers: [FormService],
})
export class TextboxPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/textbox/textbox.component");
    snippet: string = `<sebng-textbox></sebng-textbox>`;
    value: string = "Hello :)";
    extendedFormGroup: ExtendedFormGroup;
    icon: string = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170">
        <path d="M137.5,102.1V40.4a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v61.7a3,3,0,0,0,3,3H134.5A3,3,0,0,0,137.5,102.1ZM112,91.3v7.7H30.5V91.3a3,3,0,0,0-3-3,6.1,6.1,0,0,1-6.1-6.1,3,3,0,0,0-3-3H11V63h7.5a3,3,0,0,0,3-3,6.1,6.1,0,0,1,6.1-6.1,3,3,0,0,0,3-3V43.4H112v7.5a3,3,0,0,0,3,3A6.1,6.1,0,0,1,121,60a3,3,0,0,0,3,3h7.5V79.3H124a3,3,0,0,0-3,3,6.1,6.1,0,0,1-6.1,6.1A3,3,0,0,0,112,91.3ZM131.5,57h-4.9a12.1,12.1,0,0,0-8.7-8.7V43.4h13.6ZM24.5,43.4v4.9A12.1,12.1,0,0,0,15.9,57H11V43.4ZM11,85.3h4.9A12.1,12.1,0,0,0,24.5,94v5.1H11ZM118,99.1V94a12.1,12.1,0,0,0,8.7-8.7h4.9V99.1Z"></path><path d="M151.3,115.8V54.2h-6v58.7H21.7v6H148.3A3,3,0,0,0,151.3,115.8Z"></path>
        <path d="M159,67.9v58.7H35.5v6H162a3,3,0,0,0,3-3V67.9Z"></path>
        <path d="M71.3,88.8A17.5,17.5,0,1,1,88.8,71.3,17.5,17.5,0,0,1,71.3,88.8Zm0-29A11.5,11.5,0,1,0,82.8,71.3,11.5,11.5,0,0,0,71.3,59.8Z"></path>
    </svg>
    `;
    @ViewChild("rightTemplate") rightTemplate: TemplateRef<HTMLElement>;

    constructor(private formService: FormService) {
        document.title = "Textbox - SEB Angular Components";

        this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
            {
                key: "text",
                items: [
                    { key: "placeholder", label: "Placeholder", controlType: "Text" },
                    { key: "label", label: "Label", controlType: "Text", value: "Element label" },
                ],
            },
            {
                key: "dropdowns",
                items: [
                    {
                        key: "left",
                        label: "Left prepend",
                        controlType: "Dropdown",
                        options: [
                            { label: "None", value: null },
                            { label: "Icon", value: this.icon },
                            { label: "Text", value: "kr" },
                            { label: "Template", value: true },
                        ],
                    },
                    {
                        key: "right",
                        label: "Right append",
                        description: "The element to be displayed on the right.",
                        controlType: "Dropdown",
                        options: [
                            { label: "None", value: null },
                            { label: "Icon", value: this.icon },
                            { label: "Text", value: "$" },
                            { label: "Template", value: true },
                        ],
                    },
                ],
            },
            {
                key: "numbers",
                items: [
                    {
                        key: "min",
                        label: "Min",
                        description: "Minimum length of input allowed for the textbox.",
                        controlType: "Number",
                        value: 1,
                        min: 1,
                        max: 1000,
                    },
                    {
                        key: "max",
                        label: "Max",
                        description: "Maximum length of input allowed for the textbox.",
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
                        key: "required",
                        value: false,
                        controlType: "Checkbox",
                        description: "Property sets whether textbox is required.",
                        label: "Required",
                        order: 30,
                    },
                    {
                        key: "readonly",
                        value: false,
                        controlType: "Checkbox",
                        description: "Property sets whether textbox is readonly.",
                        label: "Read-only",
                        order: 20,
                    },
                    {
                        key: "disabled",
                        value: false,
                        controlType: "Checkbox",
                        description: "Property sets whether textbox is disabled.",
                        label: "Disabled",
                        order: 10,
                    },
                ],
            },
        ]);
    }

    ngOnInit(): void {}
}
