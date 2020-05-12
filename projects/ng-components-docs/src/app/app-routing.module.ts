import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ROUTES as BUTTONS_ROUTES } from "./examples/components/buttons/buttons.module";
import { ROUTES as WIZARD_ROUTES } from "./examples/components/wizard/wizard.module";
import { ROUTES as DROPDOWN_ROUTES } from "./examples/components/dropdown/dropdown.module";
import { ROUTES as PAGINATION_ROUTES } from "./examples/components/pagination/pagination.module";
import { ROUTES as MODALS_ROUTES } from "./examples/components/modals/modals.module";

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
                path: "modal",
                children: MODALS_ROUTES,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
