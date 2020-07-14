import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: "app-progressbar-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-progress-bar [value]="progress"></sebng-progress-bar>
            </ng-container>
            <ng-container controls> </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class ProgressbarPageComponent implements OnInit, OnDestroy {
    importString: string = require("!raw-loader!@sebgroup/ng-components/progressbar/progressbar.component");
    snippet: string = `<sebng-progress-bar [value]="progress"></sebng-progress-bar>`;

    timerRef: NodeJS.Timeout;
    progress: number;

    constructor() {
        document.title = "Progressbar - SEB Angular Components";
    }

    ngOnInit(): void {
        this.simulateProgress();
    }

    ngOnDestroy() {
        this.timerRef && clearInterval(this.timerRef);
    }

    simulateProgress(): void {
        if (this.timerRef) {
            clearInterval(this.timerRef);
        }
        this.progress = 0;
        this.timerRef = setInterval((): void => {
            if (this.progress < 100) {
                this.progress += 1;
            } else {
                clearInterval(this.timerRef);
            }
        }, 100);
    }
}
