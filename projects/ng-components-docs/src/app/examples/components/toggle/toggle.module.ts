import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { Route } from "@angular/router";
import { ToggleComponent } from "./examples/toggle/toggle.component";
import { ToggleModule as toggle } from "../../../../../../../lib/src/toggle/toggle.module";
import { FormsModule } from "@angular/forms";

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
                        path: "toggle",
                        component: ToggleComponent,
                        data: {
                            title: "Toggle",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "toggle.component.html",
                                    src: require("!raw-loader!./examples/toggle/toggle.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "toggle.component.ts",
                                    src: require("!raw-loader!./examples/toggle/toggle.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/toggle/toggle.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [ToggleComponent],
    imports: [CommonModule, FormsModule, toggle],
})
export class ToggleModule {}
