import { Component, OnInit, OnDestroy } from "@angular/core";
import { urls } from "../../../configs";
import components from "../../../assets/components-list.json";

const SIDE_MENU_STORAGE_KEY = "SIDEMENU";

function getToggle(): boolean {
    const value: string = localStorage.getItem(SIDE_MENU_STORAGE_KEY);
    return value === null ? true : JSON.parse(value);
}

function setToggle(value: boolean): void {
    localStorage.setItem(SIDE_MENU_STORAGE_KEY, String(value));
}

@Component({
    selector: "app-side-menu",
    templateUrl: "./side-menu.component.html",
    styleUrls: ["./side-menu.component.scss"],
})
export class SideMenuComponent implements OnInit, OnDestroy {
    urls: NavsURLs = urls;
    // isMobile: boolean = useMediaQuery("(max-width: 420px)");
    isMobile: boolean = false;
    search: string = "";
    toggle: boolean = getToggle();
    highlighted: number = -1;
    listRef: HTMLElement = null;
    components: Array<ComponentsListItem> = components.sort((a, b) => (a.name > b.name ? 1 : -1));

    ngOnInit(): void {
        // console.log(this.toggle);
    }

    onToggleClick(): void {
        this.toggle = !this.toggle;
        setToggle(this.toggle);
    }

    ngOnDestroy(): void {}
}
