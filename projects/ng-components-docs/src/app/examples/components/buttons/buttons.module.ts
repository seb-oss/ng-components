import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ButtonsComponent } from "./examples/buttons/buttons.component";
import { ButtonModule as SebButtonModule } from "lib/src/button/button.module";
import { RadioGroupModule } from "lib/src/radio-group/radio-group.module";
import { DropdownModule } from "lib/src/dropdown/dropdown.module";

import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { Route } from "@angular/router";
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
                        path: "button",
                        component: ButtonsComponent,
                        data: {
                            title: "Button Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "buttons.component.html",
                                    src: require("!raw-loader!./examples/buttons/buttons.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "buttons.component.ts",
                                    src: require("!raw-loader!./examples/buttons/buttons.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/button/button.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [ButtonsComponent],
    imports: [CommonModule, SebButtonModule, RadioGroupModule, DropdownModule, FormsModule],
})
export class ButtonsModule {}
