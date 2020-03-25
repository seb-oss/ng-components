import { Component, OnInit } from "@angular/core";
// import { Item } from "lib/src/radio-group/radio-group.component";

@Component({
    selector: "app-radio-groups",
    templateUrl: "./radio-groups.component.html",
})
export class RadioGroupsComponent implements OnInit {
    constructor() {}
    list: any[] = [
        // TODO: replace any with Item!
        { key: "One", value: "1", label: "One" },
        { key: "Two", value: "2", label: "Two" },
    ];

    ngOnInit() {}
}
