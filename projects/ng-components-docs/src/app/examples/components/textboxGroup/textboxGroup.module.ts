import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { Route } from "@angular/router";
import { TextboxGroupComponent } from "./examples/textboxGroup/textboxGroup.component";
import { TextboxGroupModule as textboxGroup } from "../../../../../../../lib/src/textboxGroup/textboxGroup.module";

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
                        path: "textboxgroup",
                        component: TextboxGroupComponent,
                        data: {
                            title: "Textbox Group Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "textboxGroup.component.html",
                                    src: require("!raw-loader!./examples/textboxGroup/textboxGroup.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "textboxGroup.component.ts",
                                    src: require("!raw-loader!./examples/textboxGroup/textboxGroup.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/textboxGroup/textboxGroup.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [TextboxGroupComponent],
    imports: [CommonModule, textboxGroup],
})
export class TextboxGroupModule {}
