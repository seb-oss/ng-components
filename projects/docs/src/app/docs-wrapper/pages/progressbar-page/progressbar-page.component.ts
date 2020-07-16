import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProggressTheme, BarItem, DropdownItem } from "projects/ng-components/public-api";

@Component({
    selector: "app-progressbar-page",
    templateUrl: "./progressbar-page.component.html",
})
export class ProgressbarPageComponent implements OnInit, OnDestroy {
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
        { value: "success", label: "Success", key: "success" },
        { value: "danger", label: "Danger", key: "danger" },
        { value: "info", label: "Info", key: "info" },
        { value: "warning", label: "Warning", key: "warning" },
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

    ngOnInit(): void {
        // this.simulateProgress();
    }

    ngOnDestroy() {
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
