import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccordionComponent } from "./accordion.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { AccordionModule as AccordionLibModule } from "../../../../../../../lib/src/accordion";

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
                        path: "accordion",
                        component: AccordionComponent,
                        data: {
                            title: "Text Label Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "text-labels.component.html",
                                    src: require("!raw-loader!./accordion.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "accordion.component.ts",
                                    src: require("!raw-loader!./accordion.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/textLabel/textLabel.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [AccordionComponent],
    imports: [CommonModule, AccordionLibModule],
})
export class AccordionModule {}
