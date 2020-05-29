import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressBarComponent } from "./progressBar.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { ProgressBarsModule as ProgressBarLibModule } from "../../../../../../../lib/src/progressBar";

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
                        path: "progressBar",
                        component: ProgressBarComponent,
                        data: {
                            title: "Progress bar Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "ProgressBar.component.html",
                                    src: require("!raw-loader!./progressBar.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "ProgressBar.component.ts",
                                    src: require("!raw-loader!./progressBar.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/progressBar/progressBar.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [ProgressBarComponent],
    imports: [CommonModule, ProgressBarLibModule],
})
export class ProgressBarModule {}
