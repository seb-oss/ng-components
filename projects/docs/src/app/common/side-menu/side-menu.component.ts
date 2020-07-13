import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { urls } from "../../../configs";
import components from "../../../assets/components-list.json";

const SIDE_MENU_STORAGE_KEY = "SIDEMENU";

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
    highlighted: number = -1;
    components: Array<ComponentsListItem> = components.sort((a, b) => (a.name > b.name ? 1 : -1));

    @ViewChild("listRef") listRef: ElementRef;

    ngOnInit(): void {
        // console.log(this.toggle);
    }

    get toggle(): boolean {
        const value: string = localStorage.getItem(SIDE_MENU_STORAGE_KEY);
        return value === null ? true : JSON.parse(value);
    }

    set toggle(value: boolean) {
        localStorage.setItem(SIDE_MENU_STORAGE_KEY, String(value));
    }

    onToggleClick(): void {
        this.toggle = !this.toggle;
    }

    getChildIndex(children: HTMLCollectionOf<HTMLAnchorElement>, value: number): number {
        let i: number = 0;
        let found: number = -1;
        do {
            if (Number(children.item(i).getAttribute("data-value")) === value) {
                found = i;
            }
            i++;
        } while (i < children.length && found === -1);
        return found;
    }

    searchNavigations(e: KeyboardEvent): void {
        let highlightedItem: number;
        let children: HTMLCollectionOf<HTMLAnchorElement>;
        switch (e.key.toLowerCase()) {
            case "escape":
                this.highlighted = -1;
                this.search = "";
                break;
            case "enter":
                const currentElements: HTMLCollectionOf<HTMLAnchorElement> = this.listRef.nativeElement.children;
                if (currentElements.length) {
                    console.table({ highlighted: this.highlighted, search: this.search });
                    if (this.highlighted !== -1) {
                        currentElements.item(this.highlighted).click();
                        this.highlighted = -1;
                        this.search = "";
                    } else {
                        this.highlighted = 0;
                    }
                }
                break;
            case "arrowdown":
                e.preventDefault();
                children = this.listRef.nativeElement.children as HTMLCollectionOf<HTMLAnchorElement>;
                if (children.length) {
                    highlightedItem = this.getChildIndex(children, this.highlighted);
                    if (highlightedItem === -1) {
                        this.highlighted = Number(children.item(0).getAttribute("data-value"));
                    } else {
                        if (children.item(highlightedItem).nextSibling) {
                            this.highlighted = Number(children.item(highlightedItem).nextElementSibling.getAttribute("data-value"));
                        }
                    }
                }
                break;
            case "arrowup":
                e.preventDefault();
                children = this.listRef.nativeElement.children as HTMLCollectionOf<HTMLAnchorElement>;
                if (children.length) {
                    highlightedItem = this.getChildIndex(children, this.highlighted);
                    if (highlightedItem === -1) {
                        this.highlighted = Number(children.item(0).getAttribute("data-value"));
                    } else {
                        if (children.item(highlightedItem).previousSibling) {
                            this.highlighted = Number(children.item(highlightedItem).previousElementSibling.getAttribute("data-value"));
                        }
                    }
                }
                break;
        }
    }

    ngOnDestroy(): void {}
}
