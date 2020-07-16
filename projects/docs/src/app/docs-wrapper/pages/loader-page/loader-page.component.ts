import { Component } from "@angular/core";
import { LoaderSize, LoaderType } from "@sebgroup/ng-components/loader";
import { DropdownItem } from "@sebgroup/ng-components/dropdown";

type Color = "primary" | "secondary" | "warning" | "danger" | "success" | "white" | "info" | "light" | "dark" | "body" | "muted";

@Component({
    selector: "app-loader-page",
    templateUrl: "./loader-page.component.html",
})
export class LoaderPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/loader/loader.component");
    snippet: string = `<sebng-loader></sebng-loader>`;
    toggle: boolean = true;

    constructor() {
        document.title = "Loader - SEB Angular Components";
    }

    classNames: string;
    lightColors: Array<Color> = ["white", "secondary", "light"];

    size: DropdownItem<LoaderSize> = { value: "md", key: "md", label: "Medium (md)" };
    type: DropdownItem<LoaderType> = { value: "spinner", key: "spinner", label: "Spinner" };
    color: DropdownItem<Color>;
    showText: Array<DropdownItem<boolean>> = [];
    showTextList: Array<DropdownItem<boolean>> = [{ value: false, key: false, label: "show text" }];

    sizeList: Array<DropdownItem<LoaderSize>> = [
        { value: "xs", key: "xs", label: "Extra small (xs)" },
        { value: "sm", key: "sm", label: "Small (sm)" },
        { value: "md", key: "md", label: "Medium (md)" },
        { value: "lg", key: "lg", label: "Large (lg)" },
    ];

    typeList: Array<DropdownItem<LoaderType>> = [
        { value: "spinner", key: "spinner", label: "Spinner" },
        { value: "square", key: "square", label: "Square" },
    ];

    colorList: Array<DropdownItem<Color>> = [
        { value: undefined, key: undefined, label: "none" },
        { value: "primary", key: "primary", label: "text-primary" },
        { value: "secondary", key: "secondary", label: "text-secondary" },
        { value: "warning", key: "warning", label: "text-warning" },
        { value: "danger", key: "danger", label: "text-danger" },
        { value: "success", key: "success", label: "text-success" },
        { value: "white", key: "white", label: "text-white" },
        { value: "info", key: "info", label: "text-info" },
        { value: "light", key: "light", label: "text-light" },
        { value: "dark", key: "dark", label: "text-dark" },
        { value: "body", key: "body", label: "text-body" },
        { value: "muted", key: "muted", label: "text-muted" },
    ];

    getSvgColor(): string {
        return this.lightColors.some((c: Color) => c === this.color?.value) ? "#636363" : "#efefef";
    }
}
