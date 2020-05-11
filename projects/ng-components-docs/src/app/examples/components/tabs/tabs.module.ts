import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { Route } from "@angular/router";
import { TabsComponent } from "./examples/tabs/tabs.component";
import { TabsModule as Tabs } from "../../../../../../../lib/src/tabs";

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
                        path: "tabs",
                        component: TabsComponent,
                        data: {
                            title: "Tabs",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "tabs.component.html",
                                    src: require("!raw-loader!./examples/tabs/tabs.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "pagination.component.ts",
                                    src: require("!raw-loader!./examples/tabs/tabs.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/tabs/tabs.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [TabsComponent],
    imports: [CommonModule, Tabs],
})
export class TabsModule {}
