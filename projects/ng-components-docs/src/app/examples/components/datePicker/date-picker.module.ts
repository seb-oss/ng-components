import { NgModule } from "@angular/core";
import { DatePickerExamplesComponent } from "./date-picker-examples.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { DatePickerModule as DatePickerLibModule } from "../../../../../../../lib/src/datePicker";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export const ROUTES = [
    { path: "", pathMatch: "full", redirectTo: "examples" },
    {
        path: "",
        component: ExamplePageComponent,
        children: [
            {
                path: "examples",
                component: ExampleListComponent,
                children: [
                    {
                        path: "datePicker",
                        component: DatePickerExamplesComponent,
                        data: {
                            title: "Date Picker Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "date-picker-examples.component.html",
                                    src: require("!raw-loader!./date-picker-examples.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "date-picker-examples.component.ts",
                                    src: require("!raw-loader!./date-picker-examples.component.ts").default,
                                    lang: "ts",
                                },
                            ],
                        },
                    },
                ],
            },
            {
                path: "api",
                component: ApiListComponent,
                data: {
                    sources: [require("!raw-loader!../../../../../../../lib/src/datePicker/date-picker.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [DatePickerExamplesComponent],
    imports: [CommonModule, DatePickerLibModule, FormsModule, ReactiveFormsModule],
})
export class DatePickerModule {}
