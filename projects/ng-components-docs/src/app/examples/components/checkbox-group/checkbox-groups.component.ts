import { Component } from "@angular/core";
import { CheckboxGroupItem } from "lib/src/checkbox-group/checkbox-group.component";
import { FormControl } from "@angular/forms";

@Component({
    selector: "app-checkbox-groups",
    templateUrl: "./checkbox-groups.component.html",
})
export class CheckboxGroupsComponent {
    list: CheckboxGroupItem[] = [
        { key: "One", value: "1", label: "One", description: "Description" },
        { key: "Two", value: "2", label: "Two" },
    ];

    list2: CheckboxGroupItem[] = [...this.list];
    list3: CheckboxGroupItem[] = [...this.list];
    list4: CheckboxGroupItem[] = [...this.list];
    list5: CheckboxGroupItem[] = [...this.list, { key: "Three", value: "3", label: "Three disabled", disabled: true }];
    list6: CheckboxGroupItem[] = [...this.list];
    list7: CheckboxGroupItem[] = [...this.list];
    list8: CheckboxGroupItem[] = [
        ...this.list,
        {
            key: "Three",
            customTemplate:
                "<div class='btn btn-outline-primary m-0'><h5>I'm a custom html element :)</h5> </ br> <p> You can put whatever you like in here </p></div>",
            value: "3",
        },
    ];

    formcontrol: FormControl = new FormControl();
    model: CheckboxGroupItem;
}
