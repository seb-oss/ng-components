import { Component, OnInit } from "@angular/core";
import { DropdownItem } from "lib/src/dropdown/dropDown.component";

@Component({
    selector: "app-dropdowns",
    templateUrl: "./dropdowns.component.html",
    styleUrls: ["./dropdowns.component.scss"],
})
export class DropdownsComponent implements OnInit {
    constructor() {}
    list: DropdownItem[] = [
        { text: "One", value: "1" },
        { text: "Two", value: "2" },
    ];

    ngOnInit() {}
}
