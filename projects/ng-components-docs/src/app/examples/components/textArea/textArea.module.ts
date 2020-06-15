import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { Route } from "@angular/router";
import { TextAreaComponent } from "./examples/textArea/textArea.component";
import { TextAreanModule as textArea } from "../../../../../../../lib/src/textArea";

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
                        path: "textArea",
                        component: TextAreaComponent,
                        data: {
                            title: "TextArea",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "textArea.component.html",
                                    src: require("!raw-loader!./examples/textArea/textArea.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "pagination.component.ts",
                                    src: require("!raw-loader!./examples/textArea/textArea.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/textArea/textArea.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [TextAreaComponent],
    imports: [CommonModule, textArea, FormsModule],
})
export class TextAreaModule {}
