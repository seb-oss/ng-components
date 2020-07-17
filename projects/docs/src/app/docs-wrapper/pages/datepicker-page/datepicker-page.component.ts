import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-datepicker-page",
    templateUrl: "./datepicker-page.component.html",
})
export class DatepickerPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/datepicker/datepicker.component");
    snippet: string = `<sebng-datepicker [(ngModel)]="model"></sebng-datepicker>`;
    model: Date;

    // controls
    monthPicker: boolean;
    forceCustom: boolean;
    localeCode: string = "en-US";
    rangeFrom: Date;
    rangeTo: Date;

    constructor() {
        document.title = "Datepicker - SEB Angular Components";
        const today: Date = new Date();
        const nextMonth: Date = new Date();
        nextMonth.setMonth(today.getMonth() + 1);
        this.model = today;
        this.rangeFrom = today;
        this.rangeTo = nextMonth;
    }

    ngOnInit(): void {}
}
