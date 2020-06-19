import { Component, OnInit } from "@angular/core";
import { ButtonTheme, ButtonSize, ButtonTags } from "lib/src/button/button.component";
import { DropdownItem } from "lib/src/dropdown";

interface Item<T> {
    label: string;
    value: T;
    key: T;
}

@Component({
    selector: "app-buttons",
    templateUrl: "./buttons.component.html",
    styleUrls: ["./buttons.component.scss"],
})
export class ButtonsComponent implements OnInit {
    themeList: Array<Item<ButtonTheme>> = [];
    sizeList: Array<Item<ButtonSize>> = [];
    theme: Item<ButtonTheme> = { label: "primary", value: "primary", key: "primary" };
    size: Item<ButtonSize> = { label: "medium", value: "md", key: "md" };
    tag: Item<ButtonTags> = { label: "Button", value: "button", key: "button" };
    list: Array<DropdownItem> = [];
    selectedOptions: Array<DropdownItem> = [];

    constructor() {}

    ngOnInit() {
        this.list = [
            { key: "block", value: true, label: "Block" },
            { key: "disabled", value: true, label: "Disabled" },
            { key: "icon", value: true, label: "icon" },
        ];

        this.themeList = [
            { label: "Danger", value: "danger", key: "danger" },
            { label: "Light", value: "light", key: "light" },
            { label: "Secondary", value: "secondary", key: "secondary" },
            { label: "Primary", value: "primary", key: "primary" },
            { label: "Dark", value: "dark", key: "dark" },
            { label: "Link", value: "link", key: "link" },
            { label: "Outline danger", value: "outline-danger", key: "outline-danger" },
            { label: "Outline primary", value: "outline-primary", key: "outline-primary" },
        ];

        this.sizeList = [
            { label: "Large", value: "lg", key: "lg" },
            { label: "medium", value: "md", key: "md" },
            { label: "small", value: "sm", key: "sm" },
        ];
    }

    optionSelected(option: string): boolean {
        return this.selectedOptions.some((o: DropdownItem) => o.key === option);
    }
}
