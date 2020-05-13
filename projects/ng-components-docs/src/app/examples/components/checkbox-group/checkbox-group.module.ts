import { NgModule } from "@angular/core";
import { Route } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { CheckboxGroupsComponent } from "./checkbox-groups.component";
import { CheckboxGroupModule as CheckboxGroupLibModule } from "../../../../../../../lib/src/checkbox-group";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
                        path: "checkbox-group",
                        component: CheckboxGroupsComponent,
                        data: {
                            title: "Radio Group",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "checkbox-groups.component.html",
                                    src: require("!raw-loader!./checkbox-groups.component.html"),
                                    lang: "markup",
                                },
                                {
                                    name: "checkbox-groups.component.ts",
                                    src: require("!raw-loader!./checkbox-groups.component.ts"),
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/checkbox-group/checkbox-group.component.ts")],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [CheckboxGroupsComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, CheckboxGroupLibModule],
})
export class CheckboxGroupModule {}
