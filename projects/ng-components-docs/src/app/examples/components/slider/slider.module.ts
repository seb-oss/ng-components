import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SliderComponent } from "./slider.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { SliderModule as Slider } from "../../../../../../../lib/src/slider";

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
                        path: "slider",
                        component: SliderComponent,
                        data: {
                            title: "Slider Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "slider.component.html",
                                    src: require("!raw-loader!./slider.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "slider.component.ts",
                                    src: require("!raw-loader!./slider.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/slider/slider.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [SliderComponent],
    imports: [CommonModule, Slider],
})
export class SliderModule {}
