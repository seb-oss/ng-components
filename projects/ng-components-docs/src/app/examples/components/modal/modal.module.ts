import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "./examples/modal/modal.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";

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
                        path: "modal",
                        component: ModalComponent,
                        data: {
                            title: "Modal Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "modal.component.html",
                                    // @ts-ignore
                                    src: require("!raw-loader!./examples/modal/modal.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "modal.component.ts",
                                    // @ts-ignore
                                    src: require("!raw-loader!./examples/modal/modal.component.ts").default,
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
                    sources: [
                        require("!raw-loader!../../../../../../../lib/src/modal/modal.ts").default,
                        require("!raw-loader!../../../../../../../lib/src/modal/modal.directives.ts").default,
                        require("!raw-loader!../../../../../../../lib/src/modal/modal.service.ts").default,
                    ],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [ModalComponent],
    imports: [CommonModule],
})
export class ModalModule {}
