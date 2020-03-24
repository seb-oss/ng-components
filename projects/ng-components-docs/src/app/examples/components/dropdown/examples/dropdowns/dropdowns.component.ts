import { Component, OnInit } from "@angular/core";
import { Item } from "lib/src/dropdown/dropdown-new.component";

@Component({
    selector: "app-dropdowns",
    templateUrl: "./dropdowns.component.html",
    styleUrls: ["./dropdowns.component.scss"],
})
export class DropdownsComponent implements OnInit {
    constructor() {}
    list: Item[] = [
        { key: "One", value: "1", label: "One" },
        { key: "Two", value: "2", label: "Two" },
    ];

    ngOnInit() {}
}
