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
    list4: RadioGroupItem[] = [...this.list];
    list5: RadioGroupItem[] = [...this.list, { key: "Three", value: "3", label: "Three disabled", disabled: true }];
    list6: RadioGroupItem[] = [...this.list];
    list7: RadioGroupItem[] = [...this.list];
    list8: RadioGroupItem[] = [
        ...this.list,
        {
            key: "Three",
            customTemplate:
                "<div class='btn btn-outline-primary m-0'><h5>I'm a custom html element :)</h5> </ br> <p> You can put whatever you like in here </p></div>",
            value: "3",
        },
    ];

    formcontrol: FormControl = new FormControl();
    model: RadioGroupItem;
}
