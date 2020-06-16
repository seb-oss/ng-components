import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChipComponent } from "./chip.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { ChipModule as Chip } from "../../../../../../../lib/src/chip";

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
                        path: "chip",
                        component: ChipComponent,
                        data: {
                            title: "Chip Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "chip.component.html",
                                    src: require("!raw-loader!./chip.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "chip.component.ts",
                                    src: require("!raw-loader!./chip.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/chip/chip.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [ChipComponent],
    imports: [CommonModule, Chip],
})
export class ChipModule {}
