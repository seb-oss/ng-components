import { Component } from "@angular/core";
import { ButtonTheme, ButtonSize } from "@sebgroup/ng-components/button";
import { DropdownItem } from "@sebgroup/ng-components/dropdown";

@Component({
    selector: "app-button-page",
    templateUrl: "./button-page.component.html",
})
export class ButtonPageComponent {
    themeList: Array<DropdownItem<ButtonTheme>> = [
        { label: "primary", value: "primary" },
        { label: "outline-primary", value: "outline-primary" },
        { label: "secondary", value: "secondary" },
        { label: "danger", value: "danger" },
        { label: "outline-danger", value: "outline-danger" },
        { label: "dark", value: "dark" },
        { label: "light", value: "light" },
        { label: "link", value: "link" },
    ];
    sizeList: Array<DropdownItem<ButtonSize>> = [
        { label: "sm", value: "sm" },
        { label: "md", value: "md" },
        { label: "lg", value: "lg" },
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
