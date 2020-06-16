import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VideoComponent } from "./video.component";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { VideoModule as VideoLibModule } from "../../../../../../../lib/src/video";

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
                        path: "video",
                        component: VideoComponent,
                        data: {
                            title: "Video Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "video.component.html",
                                    src: require("!raw-loader!./video.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "video.component.ts",
                                    src: require("!raw-loader!./video.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/video/video.component.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [VideoComponent],
    imports: [CommonModule, VideoLibModule],
})
export class VideoModule {}
