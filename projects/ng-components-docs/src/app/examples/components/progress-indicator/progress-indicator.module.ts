import { NgModule } from "@angular/core";
import { Route } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { ProgressIndicatorModule as ProgressIndicatorLibModule } from "../../../../../../../lib/src/progress-indicator";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProgressIndicatorComponent } from "./examples/progress-indicator/progress-indicator.component";

export const ROUTES: Array<Route> = [
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
                        path: "progress-indicator",
                        component: ProgressIndicatorComponent,
                        data: {
                            title: "Progress Indicator Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "progress-indicator.component.html",
                                    src: require("!raw-loader!./examples/progress-indicator/progress-indicator.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "progress-indicator.component.ts",
                                    src: require("!raw-loader!./examples/progress-indicator/progress-indicator.component.ts").default,
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
                    sources: [
                        require("!raw-loader!../../../../../../../lib/src/progress-indicator/progress-indicator.component.ts").default,
                    ],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [ProgressIndicatorComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ProgressIndicatorLibModule],
})
export class ProgressIndicatorModule {}
