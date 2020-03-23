import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { MenuItem } from "../../interfaces/menu-item";
import { MenuService } from "./menu.service";
import { MenuQuery } from "./menu.query";

@Component({
    selector: "app-side-menu",
    templateUrl: "./side-menu.component.html",
    styleUrls: ["./side-menu.component.scss"],
})
export class SideMenuComponent implements OnInit {
    public $menuGroups: Observable<Array<MenuItem>>;
    public $isActive: Observable<boolean>;

    constructor(private menuServiceService: MenuService, private menuQuery: MenuQuery) {
        this.$isActive = this.menuQuery.$isMenuActive;
    }

    ngOnInit() {
        this.$menuGroups = this.menuQuery.$menuItems;
    }

    toggleMenu(state?: boolean) {
        this.menuServiceService.toggleMenu();
    }
}
