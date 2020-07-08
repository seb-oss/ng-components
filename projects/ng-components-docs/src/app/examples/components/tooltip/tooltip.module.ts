import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { Route } from "@angular/router";
import { TooltipComponent } from "./examples/tooltip/tooltip.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule, TooltipModule as TooltipLibModule, TextboxGroupModule } from "lib/src/public_api";

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
                        path: "tooltip",
                        component: TooltipComponent,
                        data: {
                            title: "Tooltip Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "tooltip.component.html",
                                    src: require("!raw-loader!./examples/tooltip/tooltip.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "tooltip.component.ts",
                                    src: require("!raw-loader!./examples/tooltip/tooltip.component.ts").default,
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
                        require("!raw-loader!../../../../../../../lib/src/tooltip/tooltip.directive.ts").default,
                        require("!raw-loader!../../../../../../../lib/src/tooltip/tooltip.component.ts").default,
                    ],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [TooltipComponent],
    imports: [CommonModule, FormsModule, DropdownModule, TextboxGroupModule, TooltipLibModule],
})
export class TooltipModule {}
