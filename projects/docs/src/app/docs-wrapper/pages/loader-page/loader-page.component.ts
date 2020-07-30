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

    size: DropdownItem<LoaderSize> = { value: "md", label: "Medium (md)" };
    type: DropdownItem<LoaderType> = { value: "spinner", label: "Spinner" };
    color: DropdownItem<Color>;
    showText: Array<DropdownItem<boolean>> = [];
    showTextList: Array<DropdownItem<boolean>> = [{ value: false, label: "show text" }];

    sizeList: Array<DropdownItem<LoaderSize>> = [
        { value: "xs", label: "Extra small (xs)" },
        { value: "sm", label: "Small (sm)" },
        { value: "md", label: "Medium (md)" },
        { value: "lg", label: "Large (lg)" },
    ];

    typeList: Array<DropdownItem<LoaderType>> = [
        { value: "spinner", label: "Spinner" },
        { value: "square", label: "Square" },
    ];

    colorList: Array<DropdownItem<Color>> = [
        { value: undefined, label: "none" },
        { value: "primary", label: "text-primary" },
        { value: "secondary", label: "text-secondary" },
        { value: "warning", label: "text-warning" },
        { value: "danger", label: "text-danger" },
        { value: "success", label: "text-success" },
        { value: "white", label: "text-white" },
        { value: "info", label: "text-info" },
        { value: "light", label: "text-light" },
        { value: "dark", label: "text-dark" },
        { value: "body", label: "text-body" },
        { value: "muted", label: "text-muted" },
    ];

    getSvgColor(): string {
        return this.lightColors.some((c: Color) => c === this.color?.value) ? "#636363" : "#efefef";
    }
}
