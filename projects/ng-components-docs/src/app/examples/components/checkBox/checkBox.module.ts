import { NgModule } from "@angular/core";
import { Route } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CheckBoxComponent } from "./checkBox.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { CheckBoxModule as CheckBoxLibModule } from "../../../../../../../lib/src/checkBox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SebButtonModule } from "../../../../../../../lib/src/button";

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
                        path: "checkBox",
                        component: CheckBoxComponent,
                        data: {
                            title: "Checkbox component",
                            sources: [
                                {
                                    name: "checkBox.component.html",
                                    // @ts-ignore
                                    src: require("!raw-loader!./checkBox.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "checkBox.component.ts",
                                    // @ts-ignore
                                    src: require("!raw-loader!./checkBox.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/checkBox/checkBox.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [CheckBoxComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, CheckBoxLibModule, SebButtonModule],
})
export class CheckBoxModule {}
