import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "./modals.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { ModalModule as ModalLibModule } from "../../../../../../../lib/src/modal";
import { SebButtonModule } from "../../../../../../../lib/src/button";

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
                        path: "Modal",
                        component: ModalComponent,
                        data: {
                            title: "Dialog Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "modals.component.html",
                                    src: require("!raw-loader!./modals.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "modals.component.ts",
                                    src: require("!raw-loader!./modals.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/modal/modal.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [ModalComponent],
    imports: [CommonModule, ModalLibModule, SebButtonModule],
})
export class ModalModule {}