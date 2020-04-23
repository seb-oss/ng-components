import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ROUTES as BUTTONS_ROUTES } from "./examples/components/buttons/buttons.module";
import { ROUTES as MODAL_ROUTES } from "./examples/components/modal/modal.module";
import { ROUTES as WIZARD_ROUTES } from "./examples/components/wizard/wizard.module";
import { ROUTES as DROPDOWN_ROUTES } from "./examples/components/dropdown/dropdown.module";
import { ROUTES as PAGINATION_ROUTES } from "./examples/components/pagination/pagination.module";
import { ROUTES as TEXTAREA_ROUTES } from "./examples/components/textArea/textArea.module";

import { InstallationComponent } from "./components/installation/installation.component";

const routes: Routes = [
    {
        path: "get-started",
        data: {
            icon: "home",
        },
        children: [
            {
                path: "",
                redirectTo: "install",
                pathMatch: "full",
            },
            {
                path: "installation",
                component: InstallationComponent,
            },
        ],
    },
    {
        path: "components",
        data: {
            icon: "cubes",
        },
        children: [
            {
                path: "",
                redirectTo: "buttons",
                pathMatch: "full",
            },
            {
                path: "buttons",
                children: BUTTONS_ROUTES,
            },
            {
                path: "modal",
                children: MODAL_ROUTES,
            },
            {
                path: "dropdown",
                children: DROPDOWN_ROUTES,
            },
            {
                path: "wizard",
                children: WIZARD_ROUTES,
            },
            {
                path: "pagination",
                children: PAGINATION_ROUTES,
            },
            {
                path: "textarea",
                children: TEXTAREA_ROUTES,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
