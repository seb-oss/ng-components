import { Component, OnInit, TemplateRef } from "@angular/core";
import { TooltipTrigger, TooltipTheme } from "@sebgroup/ng-components/tooltip";
import { TooltipPosition } from "@sebgroup/ng-components/tooltip/tooltip.positions";

@Component({
    selector: "app-tooltip-page",
    templateUrl: "./tooltip-page.component.html",
})
export class TooltipPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/tooltip/tooltip.component");
    code: string = `<sebng-tooltip [content]="content"></sebng-tooltip>`;

    content: string | TemplateRef<any> =
        "This is a tooltip This is a tooltip This is a tooltip This is a tooltip This is a tooltip This is a tooltip This is a tooltip This is a tooltip This is a tooltip This is a tooltip";
    textReference: string = "";
    className?: string = "";
    cascade: boolean = false;
    closeOnScroll: boolean = false;
    closeOnScrollDelay: number = 0;

    positionList: Array<DocDropdownItem<TooltipPosition>> = [
        { value: "top", label: "top" },
        { value: "top-left", label: "top-left" },
        { value: "top-right", label: "top-right" },
        { value: "right", label: "right" },
        { value: "right-top", label: "right-top" },
        { value: "right-bottom", label: "right-bottom" },
        { value: "bottom", label: "bottom" },
        { value: "bottom-left", label: "bottom-left" },
        { value: "bottom-right", label: "bottom-right" },
        { value: "left", label: "left" },
        { value: "left-top", label: "left-top" },
        { value: "left-bottom", label: "left-bottom" },
    ];
    themeList: Array<DocDropdownItem<TooltipTheme>> = [
        { value: "default", label: "default" },
        { value: "primary", label: "primary" },
        { value: "purple", label: "purple" },
        { value: "warning", label: "warning" },
        { value: "success", label: "success" },
        { value: "light", label: "light" },
        { value: "danger", label: "danger" },
    ];
    triggerList: Array<DocDropdownItem<TooltipTrigger>> = [
        { value: "hover", label: "hover" },
        { value: "click", label: "click" },
        { value: "focus", label: "focus" },
    ];
    position: TooltipPosition = this.positionList[3].value;
    theme: TooltipTheme = this.themeList[0].value;
    trigger: TooltipTrigger = this.triggerList[0].value;

    constructor() {
        document.title = "Tooltip - SEB Angular Components";
    }

    ngOnInit(): void {}
}
