import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextLabelComponent } from "./text-labels.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { TextLabelModule as TextLabelListModule } from "../../../../../../../lib/src/textLabel";

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
                        path: "textLabel",
                        component: TextLabelComponent,
                        data: {
                            title: "Text Label Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "text-labels.component.html",
                                    src: require("!raw-loader!./text-labels.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "text-labels.component.ts",
                                    // @ts-ignore
                                    src: require("!raw-loader!./text-labels.component.ts"),
                                    lang: "ts",
                                },
                            ],
                        },
                    },
                    {
                        path: "api",
                        component: ApiListComponent,
                        data: {
                            sources: [
                                require("!raw-loader!../../../../../../../lib/src/button/parse-source-example/parse-source-example.component.ts"),
                                require("!raw-loader!../../../../../../../lib/src/textLabel/textLabel.component.ts"),
                            ],
                        },
                    },
                ],
            },
        ],
    },
];

@NgModule({
    declarations: [TextLabelComponent],
    imports: [CommonModule, TextLabelListModule],
})
export class TextLabelModule {}
