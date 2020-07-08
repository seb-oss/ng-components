import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StepperExamplesComponent } from "./stepper-examples.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { StepperModule as StepperLibModule } from "../../../../../../../lib/src/stepper";
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
                        path: "stepper",
                        component: StepperExamplesComponent,
                        data: {
                            title: "Stepper Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "stepper-examples.component.html",
                                    src: require("!raw-loader!./stepper-examples.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "stepper-examples.component.ts",
                                    src: require("!raw-loader!./stepper-examples.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/stepper/stepper.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [StepperExamplesComponent],
    imports: [CommonModule, StepperLibModule, FormsModule, ReactiveFormsModule],
})
export class StepperModule {}
