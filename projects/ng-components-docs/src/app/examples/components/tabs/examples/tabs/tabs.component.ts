import { Component } from "@angular/core";
import { TabsListItem } from "lib/src/tabs";

@Component({
    selector: "app-tabs",
    templateUrl: "./tabs.component.html",
})
export class TabsComponent {
    tabList: Array<TabsListItem> = [{ text: "First" }, { text: "Second" }, { text: "Third" }, { text: "Fourth", disabled: true }];
    activeTab: number = 0;

    onClick(index: number) {
        console.log("Village ", index);
        this.activeTab = index;
    }
}
