import { Component, OnInit, TemplateRef, ElementRef } from "@angular/core";
import { TooltipTrigger, TooltipPosition, TooltipTheme } from "@sebgroup/ng-components/tooltip";
import { DropdownItem } from "@sebgroup/ng-components/dropdown";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

interface GenericDropdownItem<T> extends DropdownItem {
    value: T;
}

@Component({
    selector: "app-tooltip-page",
    templateUrl: "./tooltip-page.component.html",
})
export class TooltipPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/tooltip/tooltip.component");
    code: string = `<sebng-tooltip [content]="content"></sebng-tooltip>`;

    content: string | TemplateRef<any> = "This is a tooltip";
    textReference: string = "";
    className?: string = "";

    positionList: Array<GenericDropdownItem<TooltipPosition>> = [
        { value: "top", key: "top", label: "top" },
        { value: "top-left", key: "top-left", label: "top-left" },
        { value: "top-right", key: "top-right", label: "top-right" },
        { value: "right", key: "right", label: "right" },
        { value: "right-top", key: "right-top", label: "right-top" },
        { value: "right-bottom", key: "right-bottom", label: "right-bottom" },
        { value: "bottom", key: "bottom", label: "bottom" },
        { value: "bottom-left", key: "bottom-left", label: "bottom-left" },
        { value: "bottom-right", key: "bottom-right", label: "bottom-right" },
        { value: "left", key: "left", label: "left" },
        { value: "left-top", key: "left-top", label: "left-top" },
        { value: "left-bottom", key: "left-bottom", label: "left-bottom" },
    ];
    themeList: Array<GenericDropdownItem<TooltipTheme>> = [
        { value: "default", key: "default", label: "default" },
        { value: "primary", key: "primary", label: "primary" },
        { value: "purple", key: "purple", label: "purple" },
        { value: "warning", key: "warning", label: "warning" },
        { value: "success", key: "success", label: "success" },
        { value: "light", key: "light", label: "light" },
        { value: "danger", key: "danger", label: "danger" },
    ];
    triggerList: Array<GenericDropdownItem<TooltipTrigger>> = [
        { value: "hover", key: "hover", label: "hover" },
        { value: "click", key: "click", label: "click" },
        { value: "focus", key: "focus", label: "focus" },
    ];
    position: GenericDropdownItem<TooltipPosition> = this.positionList[0];
    theme: GenericDropdownItem<TooltipTheme> = this.themeList[0];
    trigger: GenericDropdownItem<TooltipTrigger> = this.triggerList[0];

    constructor() {
        document.title = "Accordion - SEB Angular Components";
    }

    ngOnInit(): void {}
}
