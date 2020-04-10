import { Component } from "@angular/core";
import { DropdownItem } from "lib/src/dropdown/dropdown.component";

@Component({
    selector: "app-dropdowns",
    templateUrl: "./dropdowns.component.html",
    styleUrls: ["./dropdowns.component.scss"],
})
export class DropdownsComponent {
    list: DropdownItem[] = [
        { key: "One", value: "1", label: "One" },
        { key: "Two", value: "2", label: "Two" },
    ];
}