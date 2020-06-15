import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableExamplesComponent } from "./table-examples.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { TableModule as TableLibModule } from "../../../../../../../lib/src/table";
import { PaginationModule as PaginationLibModule } from "../../../../../../../lib/src/pagination";

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
                        path: "table",
                        component: TableExamplesComponent,
                        data: {
                            title: "Table Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "table-examples.component.html",
                                    src: require("!raw-loader!./table-examples.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "table-examples.component.ts",
                                    src: require("!raw-loader!./table-examples.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/table/table.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [TableExamplesComponent],
    imports: [CommonModule, TableLibModule, PaginationLibModule],
})
export class TableModule {}
