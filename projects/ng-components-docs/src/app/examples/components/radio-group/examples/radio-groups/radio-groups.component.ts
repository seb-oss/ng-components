import { Component } from "@angular/core";
import { RadioGroupItem } from "lib/src/radio-group/radio-group.component";
import { FormControl } from "@angular/forms";

@Component({
    selector: "app-radio-groups",
    templateUrl: "./radio-groups.component.html",
})
export class RadioGroupsComponent {
    list: RadioGroupItem[] = [
        { key: "One", value: "1", label: "One", description: "Description" },
        { key: "Two", value: "2", label: "Two" },
    ];

    list2: RadioGroupItem[] = [...this.list];
    list3: RadioGroupItem[] = [...this.list];
    list4: RadioGroupItem[] = [...this.list, { key: "Three", value: "3", label: "Three disabled", disabled: true }];
    list5: RadioGroupItem[] = [...this.list];
    list6: RadioGroupItem[] = [...this.list];

    formcontrol: FormControl = new FormControl();
    model: RadioGroupItem;
}