import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { BreadcrumModule as Breadcrumb } from "../../../../../../../lib/src/breadcrumb";

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
                        path: "breadcrumb",
                        component: BreadcrumbComponent,
                        data: {
                            title: "Breadcrumb Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "breadcrumb.component.html",
                                    src: require("!raw-loader!./breadcrumb.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "breadcrumb.component.ts",
                                    src: require("!raw-loader!./breadcrumb.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/breadcrumb/breadcrumb.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [BreadcrumbComponent],
    imports: [CommonModule, Breadcrumb],
})
export class BreadcrumbModule {}
