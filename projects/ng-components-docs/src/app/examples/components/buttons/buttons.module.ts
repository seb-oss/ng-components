import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ButtonsComponent } from "./examples/buttons/buttons.component";
import { SebButtonModule } from "@sebgroup/ng-components";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { Route } from "@angular/router";

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
                        path: "button",
                        component: ButtonsComponent,
                        data: {
                            title: "Button directive",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "buttons.component.html",
                                    src: require("!raw-loader!./examples/buttons/buttons.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "buttons.component.ts",
                                    src: require("!raw-loader!./examples/buttons/buttons.component.ts"),
                                    lang: "ts",
                                },
                            ],
                        },
                    },
                    {
                        path: "another-example",
                        component: ButtonsComponent,
                        data: {
                            title: "Another button example (same component)",
                            description: `Same component used for the sake of showing how multiple examples can be set up.
                          It's also possible to add html like a <a href="http://www.seb.se" target="blank">link</a>.`,
                            sources: [
                                {
                                    name: "buttons.component.html",
                                    src: `<div>Some other <strong class="fancy-class">inline</strong> example markup</div>`,
                                    lang: "markup",
                                },
                                {
                                    name: "buttons.component.js",
                                    src: `foo(bar: any) => {
                console.log(bar);
              }`,
                                    lang: "js",
                                },
                                {
                                    name: "buttons.component.css",
                                    src: `
                .fancy-class {
                  color: hotpink !important;
                }
              `,
                                    lang: "css",
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/button/button.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [ButtonsComponent],
    imports: [CommonModule, SebButtonModule],
})
export class ButtonsModule {}
