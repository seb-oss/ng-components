import { Component, OnInit } from "@angular/core";
import { LoaderSize, LoaderType } from "@sebgroup/ng-components/loader";

type Color = "primary" | "secondary" | "warning" | "danger" | "success" | "white" | "info" | "light" | "dark" | "body" | "muted";

interface Item<T> {
    label: string;
    value: T;
    key: T;
}

@Component({
    selector: "app-loader-page",
    templateUrl: "./loader-page.component.html",
})
export class LoaderPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/loader/loader.component");
    snippet: string = `<sebng-loader></sebng-loader>`;
    toggle: boolean = true;

    constructor() {
        document.title = "Loader - SEB Angular Components";
    }

    ngOnInit(): void {}

    classNames: string;
    lightColors: Array<Color> = ["white", "secondary", "light"];

    size: Item<LoaderSize> = { value: "md", key: "md", label: "Medium (md)" };
    type: Item<LoaderType> = { value: "spinner", key: "spinner", label: "Spinner" };
    color: Item<Color>;
    showText: Array<Item<boolean>> = [];
    showTextList: Array<Item<boolean>> = [{ value: false, key: false, label: "show text" }];

    sizeList: Array<Item<LoaderSize>> = [
        { value: "xs", key: "xs", label: "Extra small (xs)" },
        { value: "sm", key: "sm", label: "Small (sm)" },
        { value: "md", key: "md", label: "Medium (md)" },
        { value: "lg", key: "lg", label: "Large (lg)" },
    ];

    typeList: Array<Item<LoaderType>> = [
        { value: "spinner", key: "spinner", label: "Spinner" },
        { value: "square", key: "square", label: "Square" },
    ];

    colorList: Array<Item<Color>> = [
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
