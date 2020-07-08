import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "./loader.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { LoaderModule as LoaderLibModule } from "../../../../../../../lib/src/loader";
import { RadioGroupModule as RadioLibModule } from "../../../../../../../lib/src/radio-group";
import { DropdownModule as DropdownLibModule } from "../../../../../../../lib/src/dropdown";
import { FormsModule } from "@angular/forms";

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
                        path: "loader",
                        component: LoaderComponent,
                        data: {
                            title: "Loader Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "loader.component.html",
                                    src: require("!raw-loader!./loader.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "loader.component.ts",
                                    src: require("!raw-loader!./loader.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/loader/loader.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [LoaderComponent],
    imports: [CommonModule, LoaderLibModule, RadioLibModule, DropdownLibModule, FormsModule],
})
export class LoaderModule {}
