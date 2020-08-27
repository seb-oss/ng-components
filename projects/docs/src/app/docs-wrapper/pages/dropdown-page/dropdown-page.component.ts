import { Component } from "@angular/core";
import { DropdownItem, DropdownPlaceholders } from "@sebgroup/ng-components/dropdown";

@Component({
    selector: "app-dropdown-page",
    templateUrl: "./dropdown-page.component.html",
})
export class DropdownPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/dropdown/dropdown.component");
    snippet: string = `<sebng-dropdown [list]="list"></sebng-dropdown>`;
    list: Array<DropdownItem> = [...Array(10)].map(
        (_, i): DropdownItem => {
            return { label: `Item ${i + 1}`, value: `value-${i + 1}`, disabled: i === 4 };
        }
    );

    selectedValue: DropdownItem = { ...this.list[2] };
    selectedValues: DropdownItem[] = [{ ...this.list[0] }, { ...this.list[3] }, { ...this.list[4] }];

    showPlaceholders: boolean = false;
    // controls
    isNative: boolean = false;
    isEllipsisMode: boolean = false;
    disabled: boolean = false;
    searchable: boolean = false;
    clearable: boolean = false;
    placeholder: string;
    searchText: string;
    selectAllOptionText: string;
    selectAllText: string;
    emptyText: string;
    noResultText: string;
    useShorthand: boolean = false;

    constructor() {
        document.title = "Dropdown - SEB Angular Components";
    }

    onShorthandChange(): void {
        if (this.useShorthand) {
            this.list = this.list.map((item, i) => ({ ...item, shorthand: i.toString() }));
        } else {
            this.list = this.list.map((item, i) => ({ ...item, shorthand: null }));
        }
        // This is just to trigger the dropdown component to rerender with the `shorthand`
        this.selectedValue = this.list.filter(item => item.value === this.selectedValue.value)[0];
    }
}
