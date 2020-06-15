import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { Route } from "@angular/router";
import { PaginationComponent } from "./examples/pagination/pagination.component";
import { PaginationModule as Pagination } from "../../../../../../../lib/src/pagination";

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
                        path: "pagination",
                        component: PaginationComponent,
                        data: {
                            title: "Pagination",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "pagintaion.component.html",
                                    src: require("!raw-loader!./examples/pagination/pagination.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "pagination.component.ts",
                                    src: require("!raw-loader!./examples/pagination/pagination.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/pagination/pagination.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [PaginationComponent],
    imports: [CommonModule, Pagination],
})
export class PaginationModule {}
