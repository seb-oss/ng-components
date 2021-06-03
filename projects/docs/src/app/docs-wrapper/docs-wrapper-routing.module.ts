import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DocsWrapperComponent } from "./docs-wrapper.component";
import components from "../../assets/components-list.json";

const routes: Routes = [
    {
        path: "",
        component: DocsWrapperComponent,
        children: [
            { path: "", redirectTo: "getting-started", pathMatch: "full" },
            {
                path: "getting-started",
                loadChildren: () => import("./getting-started/getting-started.module").then(m => m.GettingStartedModule),
            },
            {
                path: "dynamic-form",
                loadChildren: () => import("./pages/dynamic-form-page/dynamic-form-page.module").then(m => m.DynamicFormPageModule),
            },
            {
                path: "accordion",
                loadChildren: () => import("./pages/accordion-page/accordion-page.module").then(m => m.AccordionPageModule),
            },
            {
                path: "breadcrumb",
                loadChildren: () => import("./pages/breadcrumb-page/breadcrumb-page.module").then(m => m.BreadcrumbPageModule),
            },
            {
                path: "button",
                loadChildren: () => import("./pages/button-page/button-page.module").then(m => m.ButtonPageModule),
            },
            {
                path: "checkbox",
                loadChildren: () => import("./pages/checkbox-page/checkbox-page.module").then(m => m.CheckboxPageModule),
            },
            {
                path: "chip",
                loadChildren: () => import("./pages/chip-page/chip-page.module").then(m => m.ChipPageModule),
            },
            {
                path: "collapse",
                loadChildren: () => import("./pages/collapse-page/collapse-page.module").then(m => m.CollapsePageModule),
            },
            {
                path: "datepicker",
                loadChildren: () => import("./pages/datepicker-page/datepicker-page.module").then(m => m.DatepickerPageModule),
            },
            {
                path: "dropdown",
                loadChildren: () => import("./pages/dropdown-page/dropdown-page.module").then(m => m.DropdownPageModule),
            },
            {
                path: "loader",
                loadChildren: () => import("./pages/loader-page/loader-page.module").then(m => m.LoaderPageModule),
            },
            {
                path: "modal",
                loadChildren: () => import("./pages/modal-page/modal-page.module").then(m => m.ModalPageModule),
            },
            {
                path: "notification",
                loadChildren: () => import("./pages/notification-page/notification-page.module").then(m => m.NotificationPageModule),
            },
            {
                path: "pagination",
                loadChildren: () => import("./pages/pagination-page/pagination-page.module").then(m => m.PaginationPageModule),
            },
            {
                path: "progressbar",
                loadChildren: () => import("./pages/progressbar-page/progressbar-page.module").then(m => m.ProgressbarPageModule),
            },
            {
                path: "radiogroup",
                loadChildren: () => import("./pages/radiogroup-page/radiogroup-page.module").then(m => m.RadioGroupPageModule),
            },
            {
                path: "rating",
                loadChildren: () => import("./pages/rating-page/rating-page.module").then(m => m.RatingPageModule),
            },
            {
                path: "slider",
                loadChildren: () => import("./pages/slider-page/slider-page.module").then(m => m.SliderPageModule),
            },
            {
                path: "stepper",
                loadChildren: () => import("./pages/stepper-page/stepper-page.module").then(m => m.StepperPageModule),
            },
            {
                path: "table",
                loadChildren: () => import("./pages/table-page/table-page.module").then(m => m.TablePageModule),
            },
            {
                path: "tabs",
                loadChildren: () => import("./pages/tabs-page/tabs-page.module").then(m => m.TabsPageModule),
            },
            {
                path: "textarea",
                loadChildren: () => import("./pages/textarea-page/textarea-page.module").then(m => m.TextareaPageModule),
            },
            {
                path: "Textbox",
                loadChildren: () => import("./pages/textbox-page/textbox-page.module").then(m => m.TextboxPageModule),
            },
            {
                path: "textlabel",
                loadChildren: () => import("./pages/textlabel-page/textlabel-page.module").then(m => m.TextlabelPageModule),
            },
            {
                path: "timeline",
                loadChildren: () => import("./pages/timeline-page/timeline-page.module").then(m => m.TimelinePageModule),
            },
            {
                path: "timer",
                loadChildren: () => import("./pages/timer-page/timer-page.module").then(m => m.TimerPageModule),
            },
            {
                path: "toggle",
                loadChildren: () => import("./pages/toggle-page/toggle-page.module").then(m => m.TogglePageModule),
            },
            {
                path: "toggle-selector",
                loadChildren: () =>
                    import("./pages/toggle-selector-page/toggle-selector-page.module").then(m => m.ToggleSelectorPageModule),
            },
            {
                path: "tooltip",
                loadChildren: () => import("./pages/tooltip-page/tooltip-page.module").then(m => m.TooltipPageModule),
            },
            {
                path: "video",
                loadChildren: () => import("./pages/video-page/video-page.module").then(m => m.VideoPageModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DocsWrapperRoutingModule {}
