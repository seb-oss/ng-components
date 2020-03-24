import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { MenuStore, NavigationState } from "./menu.store";

@Injectable({ providedIn: "root" })
export class MenuQuery extends Query<NavigationState> {
    $isMenuActive = this.select("isMenuActive");
    $menuItems = this.select("menuItems");

    constructor(protected store: MenuStore) {
        super(store);
    }
}
