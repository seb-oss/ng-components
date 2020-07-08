import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimerComponent } from "./timer.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { TimerModule as TimerLibModule } from "../../../../../../../lib/src/timer";

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
                        component: TimerComponent,
                        data: {
                            title: "Timer Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "timer.component.html",
                                    src: require("!raw-loader!./timer.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "timer.component.ts",
                                    src: require("!raw-loader!./timer.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/timer/timer.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [TimerComponent],
    imports: [CommonModule, TimerLibModule],
})
export class TimerModule {}
