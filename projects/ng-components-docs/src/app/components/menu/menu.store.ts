import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface NavigationState {
    isMenuActive: boolean;
    menuItems: Array<any>;
}

export function createInitialState(): NavigationState {
    return {
        isMenuActive: true,
        menuItems: [],
    };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "navigation" })
export class MenuStore extends Store<NavigationState> {
    constructor() {
        super(createInitialState());
    }
}
