import { Component } from "@angular/core";
import { RadioGroupItem } from "lib/src/radio-group/radio-group.component";

@Component({
    selector: "app-radio-groups",
    templateUrl: "./radio-groups.component.html",
})
export class RadioGroupsComponent {
    list: RadioGroupItem[] = [
        { key: "One", value: "1", label: "One" },
        { key: "Two", value: "2", label: "Two" },
    ];
}
