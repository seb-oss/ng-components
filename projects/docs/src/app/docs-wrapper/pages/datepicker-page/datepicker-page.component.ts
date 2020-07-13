import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-datepicker-page",
    templateUrl: "./datepicker-page.component.html",
})
export class DatepickerPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/date-picker/date-picker.component");
    model: Date;

    constructor() {
        document.title = "Datepicker - SEB Angular Components";
        this.model = new Date();
    }

    ngOnInit(): void {}
}
