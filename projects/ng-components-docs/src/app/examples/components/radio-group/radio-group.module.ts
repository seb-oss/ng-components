import { NgModule } from "@angular/core";
import { Route } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { RadioGroupsComponent } from "./examples/radio-groups/radio-groups.component";
import { RadioGroupModule as RadioGroupLibModule } from "../../../../../../../lib/src/radio-group";

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
                        path: "radio-group",
                        component: RadioGroupsComponent,
                        data: {
                            title: "Radio Group",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "radio-groups.component.html",
                                    src: require("!raw-loader!./examples/radio-groups/radio-groups.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "radio-groups.component.ts",
                                    src: require("!raw-loader!./examples/radio-groups/radio-groups.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/radio-group/radio-group.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [RadioGroupsComponent],
    imports: [CommonModule, RadioGroupLibModule],
})
export class RadioGroupModule {}
