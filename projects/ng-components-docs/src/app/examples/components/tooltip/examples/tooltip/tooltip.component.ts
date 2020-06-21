import { Component } from "@angular/core";
import { DropdownItem, TooltipTheme, TooltipPosition, TooltipTrigger } from "lib/src/public_api";

interface ExtendedDropdownItem<T> extends DropdownItem {
    value: T;
}

@Component({
    selector: "app-tooltip",
    templateUrl: "./tooltip.component.html",
})
export class TooltipComponent {
    triggerList: Array<ExtendedDropdownItem<TooltipTrigger>> = [
        { key: "Hover", value: "hover", label: "Hover" },
        { key: "Click", value: "click", label: "Click" },
        { key: "Focus", value: "focus", label: "Focus" },
    ];
    positionList: Array<ExtendedDropdownItem<TooltipPosition>> = [
        { key: "Top", value: "top", label: "Top" },
        { key: "Right", value: "right", label: "Right" },
        { key: "Bottom", value: "bottom", label: "Bottom" },
        { key: "Left", value: "left", label: "Left" },
        { key: "Top-left", value: "top-left", label: "Top-left" },
        { key: "Top-right", value: "top-right", label: "Top-right" },
        { key: "Right-top", value: "right-top", label: "Right-top" },
        { key: "Right-bottom", value: "right-bottom", label: "Right-bottom" },
        { key: "Bottom-left", value: "bottom-left", label: "Bottom-left" },
        { key: "Bottom-right", value: "bottom-right", label: "Bottom-right" },
        { key: "Left-top", value: "left-top", label: "Left-top" },
        { key: "Left-bottom", value: "left-bottom", label: "Left-bottom" },
    ];
    themeList: Array<ExtendedDropdownItem<TooltipTheme>> = [
        { key: "Default", value: "default", label: "Default" },
        { key: "Primary", value: "primary", label: "Primary" },
        { key: "Light", value: "light", label: "Light" },
        { key: "Warning", value: "warning", label: "Warning" },
        { key: "Success", value: "success", label: "Success" },
        { key: "Danger", value: "danger", label: "Danger" },
        { key: "Purple", value: "purple", label: "Purple" },
    ];
    trigger: DropdownItem = this.triggerList[0];
    position: DropdownItem = this.positionList[0];
    theme: DropdownItem = this.themeList[0];
}
