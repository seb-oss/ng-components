import { Component, OnInit, TemplateRef, ElementRef } from "@angular/core";
import { TooltipTrigger, TooltipPosition, TooltipTheme } from "@sebgroup/ng-components/tooltip";

@Component({
    selector: "app-tooltip-page",
    templateUrl: "./tooltip-page.component.html",
})
export class TooltipPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/tooltip/tooltip.component");

    content: string | TemplateRef<any> = "This is a tooltip";
    textReference: string = "";
    trigger: TooltipTrigger = "hover";
    position: TooltipPosition = "top";
    theme: TooltipTheme = "default";
    className?: string = "";

    constructor() {
        document.title = "Accordion - SEB Angular Components";
    }

    ngOnInit(): void { }
}
