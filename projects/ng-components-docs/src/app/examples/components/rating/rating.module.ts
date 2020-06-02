import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { RatingModule as Rating } from "../../../../../../../lib/src/rating";
import { RatingComponent } from "./rating.component";
import { FormsModule } from "@angular/forms";

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
                        path: "rating",
                        component: RatingComponent,
                        data: {
                            title: "Rating Component",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "rating.component.html",
                                    src: require("!raw-loader!./rating.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "rating.component.ts",
                                    src: require("!raw-loader!./rating.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/rating/rating.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [RatingComponent],
    imports: [CommonModule, FormsModule, Rating],
})
export class RatingModule {}
