import { Component } from "@angular/core";
import { ButtonTheme, ButtonSize } from "@sebgroup/ng-components/button";
import { DropdownItem } from "@sebgroup/ng-components/dropdown";

@Component({
    selector: "app-button-page",
    templateUrl: "./button-page.component.html",
})
export class ButtonPageComponent {
    themeList: Array<DropdownItem<ButtonTheme>> = [
        { label: "primary", value: "primary", key: "primary" },
        { label: "outline-primary", value: "outline-primary", key: "outline-primary" },
        { label: "secondary", value: "secondary", key: "secondary" },
        { label: "danger", value: "danger", key: "danger" },
        { label: "outline-danger", value: "outline-danger", key: "outline-danger" },
        { label: "dark", value: "dark", key: "dark" },
        { label: "light", value: "light", key: "light" },
        { label: "link", value: "link", key: "link" },
    ];
    sizeList: Array<DropdownItem<ButtonSize>> = [
        { label: "sm", value: "sm", key: "sm" },
        { label: "md", value: "md", key: "md" },
        { label: "lg", value: "lg", key: "lg" },
    ];
    disabled: boolean = false;
    block: boolean = false;

    importString: string = require("!raw-loader!@sebgroup/ng-components/button/button.component");
    snippet: string = `<sebng-button>Button label</sebng-button>`;
    theme: DropdownItem<ButtonTheme> = this.themeList[0];
    size: DropdownItem<ButtonSize> = this.sizeList[1];

    constructor() {
        document.title = "Button - SEB Angular Components";
    }
}
