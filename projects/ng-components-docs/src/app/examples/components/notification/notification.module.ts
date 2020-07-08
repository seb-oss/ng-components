import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationComponent } from "./notification.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { NotificationModule as NotificationlLibModule } from "../../../../../../../lib/src/notification";

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
                        path: "notification",
                        component: NotificationComponent,
                        data: {
                            title: "Notification Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "notification.component.html",
                                    src: require("!raw-loader!./notification.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "text-labels.component.ts",
                                    src: require("!raw-loader!./notification.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/notification/notification.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [NotificationComponent],
    imports: [CommonModule, NotificationlLibModule],
})
export class NotificationModule {}
