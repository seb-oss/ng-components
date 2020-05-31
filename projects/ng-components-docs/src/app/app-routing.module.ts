import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ROUTES as RADIOS_ROUTES } from "./examples/components/radio-group/radio-group.module";
import { ROUTES as BUTTONS_ROUTES } from "./examples/components/buttons/buttons.module";
import { ROUTES as MODAL_ROUTES } from "./examples/components/modal/modal.module";
import { ROUTES as WIZARD_ROUTES } from "./examples/components/wizard/wizard.module";
import { ROUTES as TEXTLABEL_ROUTES } from "./examples/components/textLabels/text-labels.module";
import { ROUTES as DROPDOWN_ROUTES } from "./examples/components/dropdown/dropdown.module";
import { ROUTES as PAGINATION_ROUTES } from "./examples/components/pagination/pagination.module";
import { ROUTES as TEXTAREA_ROUTES } from "./examples/components/textArea/textArea.module";
import { ROUTES as TEXTBOXGROUP_ROUTES } from "./examples/components/textboxGroup/textboxGroup.module";
import { ROUTES as TOGGLE_ROUTES } from "./examples/components/toggle/toggle.module";
import { ROUTES as CHIP_ROUTES } from "./examples/components/chip/chip.module";
import { ROUTES as TABS_ROUTES } from "./examples/components/tabs/tabs.module";
import { ROUTES as NOTIFICATION_ROUTES } from "./examples/components/notification/notification.module";
import { ROUTES as BREADCRUMB_ROUTES } from "./examples/components/breadcrumb/breadcrumb.module";

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
                path: "radios",
                children: RADIOS_ROUTES,
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
                path: "textLabel",
                children: TEXTLABEL_ROUTES,
            },
            {
                path: "pagination",
                children: PAGINATION_ROUTES,
            },
            {
                path: "textarea",
                children: TEXTAREA_ROUTES,
            },
            {
                path: "textboxGroup",
                children: TEXTBOXGROUP_ROUTES,
            },
            {
                path: "toggle",
                children: TOGGLE_ROUTES,
            },
            {
                path: "chip",
                children: CHIP_ROUTES,
            },
            {
                path: "tabs",
                children: TABS_ROUTES,
            },
            {
                path: "notification",
                children: NOTIFICATION_ROUTES,
            },
            {
                path: "breadcrumb",
                children: BREADCRUMB_ROUTES,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
