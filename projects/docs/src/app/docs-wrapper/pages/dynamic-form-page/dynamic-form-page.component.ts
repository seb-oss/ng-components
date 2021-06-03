import { Component } from "@angular/core";
import { FormService, DynamicFormOption, RuleType } from "projects/ng-components/public-api";
import { ExtendedFormGroup } from "@sebgroup/ng-components/dynamic-form/model/custom-classes/extended-form-group";

@Component({
    selector: "app-dynamic-form-page",
    templateUrl: "./dynamic-form-page.component.html",
    providers: [FormService],
})
export class DynamicFormPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/dynamic-form/dynamic-form.component");
    sizeList: DynamicFormOption<any>[] = [
        { value: null, label: "default" },
        { value: "lg", label: "lg" },
        { value: "sm", label: "sm" },
    ];
    positionList: DynamicFormOption<any>[] = [
        { value: null, label: "default" },
        { value: "right", label: "right" },
        { value: "left", label: "left" },
    ];
    extendedFormGroup: ExtendedFormGroup;
    step: string = "form1";
    constructor(private formService: FormService) {
        this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
            {
                key: "form1",
                title: "some title",
                items: [
                    // {
                    //     key: "input validation test",
                    //     controlType: "Text",
                    //     label: "validation number test",
                    //     value: "",
                    //     rules: [
                    //         {
                    //             message: "field is required",
                    //             type: RuleType.required,
                    //         },
                    //         {
                    //             message: "min should be more than 10",
                    //             type: RuleType.minLength,
                    //             value: 2,
                    //         },
                    //         {
                    //             message: "max should be less than 100",
                    //             type: RuleType.maxLength,
                    //             value: 10,
                    //         },
                    //     ],
                    // },
                    // {
                    //     key: "size",
                    //     controlType: "Dropdown",
                    //     label: "Size:",
                    //     value: this.sizeList[0],
                    //     options: this.sizeList,
                    // },
                    // {
                    //     key: "position",
                    //     controlType: "Dropdown",
                    //     label: "Position:",
                    //     value: this.positionList[0],
                    //     options: this.positionList,
                    // },
                    // {
                    //     key: "centered",
                    //     controlType: "Checkbox",
                    //     label: "Centered",
                    //     description: "Positions the modal in the middle of the page. Only works with default position.",
                    //     value: false,
                    // },
                    {
                        key: "followup",
                        controlType: "Radio",
                        label: "Follow Up question",
                        value: "",
                        options: [
                            {
                                id: "1",
                                value: "1",
                                label: "yes",
                                followUpItems: [
                                    {
                                        key: "input-follow-up",
                                        controlType: "Text",
                                        label: "validation number test",
                                        value: "",
                                    },
                                ],
                            },
                            {
                                id: "2",
                                value: "2",
                                label: "no",
                            },
                        ],
                    },
                ],
            },
        ]);
        console.log(this.extendedFormGroup);
    }

    validateForm(): void {
        console.log(this.extendedFormGroup.controls.form1);
    }

    goToNextStep(): void {
        console.log("load next");

        this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
            {
                key: "form2",
                title: "form 2 title",
                items: [
                    {
                        key: "input validation test",
                        controlType: "Text",
                        label: "validation number test",
                        value: 0,
                    },
                ],
                multi: true,
            },
        ]);
        this.step = "form2";
    }
}
