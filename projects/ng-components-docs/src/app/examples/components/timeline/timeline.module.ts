import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimelineComponent } from "./timeline.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { TimelineModule as TimelinelLibModule } from "../../../../../../../lib/src/timeline";

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
                        path: "textLabel",
                        component: TimelineComponent,
                        data: {
                            title: "Timeline Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "timeline.component.html",
                                    src: require("!raw-loader!./timeline.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "timeline.component.ts",
                                    src: require("!raw-loader!./timeline.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/timeline/timeline.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [TimelineComponent],
    imports: [CommonModule, TimelinelLibModule],
})
export class TimelineModule {}
