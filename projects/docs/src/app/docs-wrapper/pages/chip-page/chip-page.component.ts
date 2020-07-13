import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-chip-page",
    templateUrl: "./chip-page.component.html",
})
export class ChipPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/chip/chip.component");

    constructor() {
        document.title = "Chip - SEB Angular Components";
    }

    ngOnInit(): void {}
}
