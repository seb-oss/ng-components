import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProggressTheme, BarItem, DropdownItem } from "projects/ng-components/public-api";

@Component({
    selector: "app-progressbar-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-progress-bar
                    [value]="value"
                    [height]="height"
                    [showProgress]="showProgress"
                    [striped]="striped"
                    [animated]="animated"
                    [theme]="themeItem?.value"
                    [multiBars]="showMultiBars ? multiBars : null"
                ></sebng-progress-bar>
            </ng-container>
            <ng-container controls>
                <div class="form-group">
                    <sebng-checkbox
                        label="Show custom bars"
                        description="Show custom defined bars. *"
                        [(ngModel)]="showMultiBars"
                    ></sebng-checkbox>
                </div>
                <small class="bg-dark p-3 mb-3" *ngIf="showMultiBars"
                    ><code>{{ multiBars | json }}</code></small
                >

                <ng-container *ngIf="!showMultiBars">
                    <button [disabled]="isBeingSimulated" class="btn btn-primary mb-3 w-100" (click)="simulateProgress()">
                        Simulate progress
                    </button>

                    <label>Progress value</label>
                    <small>The current value of the progress in % (0 to 100)</small>
                    <sebng-slider class="mb-3" [disabled]="isBeingSimulated" [(ngModel)]="value" [max]="100" [min]="0"></sebng-slider>

                    <label>Progress height</label>
                    <small>The height of the progress bar in <code>px</code></small>
                    <sebng-stepper [(ngModel)]="height" [max]="100" [min]="1"></sebng-stepper>

                    <sebng-dropdown label="Theme" [list]="themeList" [(ngModel)]="themeItem"></sebng-dropdown>

                    <sebng-checkbox label="Show progress" description="Show progress as text." [(ngModel)]="showProgress"></sebng-checkbox>
                    <sebng-checkbox
                        label="Striped"
                        description="Display the progress bar as striped."
                        [(ngModel)]="striped"
                    ></sebng-checkbox>
                    <sebng-checkbox
                        *ngIf="striped"
                        label="Animated"
                        description="Animate the stripes."
                        [(ngModel)]="animated"
                    ></sebng-checkbox>
                </ng-container>
            </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
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
