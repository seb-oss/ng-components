import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-checkbox",
    templateUrl: "./checkBox.component.html",
    styleUrls: ["./checkBox.component.scss"],
})
export class CheckBoxComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    logMe(param) {
        console.log("param", param);
    }
}
