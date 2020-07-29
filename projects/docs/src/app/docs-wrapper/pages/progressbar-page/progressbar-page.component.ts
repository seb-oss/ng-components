import { Component, OnDestroy } from "@angular/core";
import { ProggressTheme, BarItem, DropdownItem } from "projects/ng-components/public-api";

@Component({
    selector: "app-progressbar-page",
    templateUrl: "./progressbar-page.component.html",
})
export class ProgressbarPageComponent implements OnDestroy {
    importString: string = require("!raw-loader!@sebgroup/ng-components/progressbar/progressbar.component");
    snippet: string = `<sebng-progress-bar [value]="progress"></sebng-progress-bar>`;

    timerRef: any;
    isBeingSimulated: boolean = false;
    // controls
    value: number = 50;
    height: number = 16;
    showProgress: boolean;
    striped: boolean;
    animated: boolean;
    showMultiBars: boolean;
    themeList: DropdownItem<ProggressTheme>[] = [
        { value: "success", label: "Success" },
        { value: "danger", label: "Danger" },
        { value: "info", label: "Info" },
        { value: "warning", label: "Warning" },
    ];
    themeItem: DropdownItem<ProggressTheme> = this.themeList[0];
    multiBars: Array<BarItem> = [
        { value: 20, theme: "success" },
        { value: 30, theme: "danger", striped: true },
        { value: 30, theme: "info", striped: true, animated: true },
        { value: 20, theme: "warning", showProgress: true },
    ];

    constructor() {
        document.title = "Progressbar - SEB Angular Components";
    }

    ngOnDestroy(): void {
        this.timerRef && clearInterval(this.timerRef);
    }

    simulateProgress(): void {
        if (this.timerRef) {
            clearInterval(this.timerRef);
        }
        this.value = 0;
        this.isBeingSimulated = true;
        this.timerRef = setInterval((): void => {
            if (this.value < 100) {
                this.value += 1;
            } else {
                this.isBeingSimulated = false;
                clearInterval(this.timerRef);
            }
        }, 100);
    }
}
