import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplePageComponent } from "../../../components/example-page/example-page.component";
import { ExampleListComponent } from "../../../components/example-page/example-list/example-list.component";
import { ApiListComponent } from "../../../components/example-page/api-list/api-list.component";
import { Route } from "@angular/router";
import { WizardFormsComponent } from "./examples/wizard-forms/wizard-forms.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SebWizardModule } from "../../../../../../../lib/src/wizard";
import { ButtonModule as SebButtonModule } from "../../../../../../../lib/src/button";
import { ModalModule } from "../../../../../../../lib/src/modal";
import { WizardComponent } from "./examples/wizard/wizard.component";

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
                        path: "wizard",
                        component: WizardComponent,
                        data: {
                            title: "Wizard",
                            description: "Additional description for example (optional)",
                            sources: [
                                {
                                    name: "wizard.component.html",
                                    src: require("!raw-loader!./examples/wizard/wizard.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "wizard.component.ts",
                                    src: require("!raw-loader!./examples/wizard/wizard.component.ts").default,
                                    lang: "ts",
                                },
                                {
                                    name: "wizard-forms.component.html",
                                    src: require("!raw-loader!./examples/wizard-forms/wizard-forms.component.html").default,
                                    lang: "markup",
                                },
                                {
                                    name: "wizard-forms.component.ts",
                                    src: require("!raw-loader!./examples/wizard-forms/wizard-forms.component.ts").default,
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
                    sources: [require("!raw-loader!../../../../../../../lib/src/wizard/wizard.module.ts").default],
                },
            },
        ],
    },
];

@NgModule({
    declarations: [WizardFormsComponent, WizardComponent],
    imports: [CommonModule, ReactiveFormsModule, SebWizardModule, SebButtonModule, ModalModule],
    entryComponents: [WizardFormsComponent],
})
export class WizardModule {}
