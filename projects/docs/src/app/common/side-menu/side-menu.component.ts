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
    /** Making the config URLs (github, contributors, issues, etc) accessible in the template */
    urls: NavsURLs = urls;
    /** TODO: Add mobile detection */
    isMobile: boolean = false;
    /** Search keyword(s) */
    search: string = "";
    /** The highlighted item in the sidemenu. Items will be highlighted when navigating using arrow keys */
    highlighted: number = -1;
    /** The list of components to be rendered in the sidemenu */
    components: Array<ComponentsListItem> = components.sort((a, b) => (a.name > b.name ? 1 : -1));
    /**
     * The operating system running the browser.
     * This is used to determine the text that should be displayed to the user when hovering over the toggle button
     */
    platform: "mac" | "win" = navigator.platform.substr(0, 3).toLocaleLowerCase() as any;
    modifier: string = this.platform === "win" ? "Control" : this.platform === "mac" ? "Command" : "";
    prestine: boolean = true;
    initialToggle: boolean;
    isAnimating: boolean = false;

    constructor() {
        const value: string = localStorage.getItem(SIDE_MENU_STORAGE_KEY);
        this.initialToggle = value === null ? true : JSON.parse(value);
    }

    @ViewChild("listRef") listRef: ElementRef;

    ngOnInit(): void {
        document.addEventListener("keyup", this.documentKeyupListener);
    }

    /**
     * A listener attached to the document to listen to shortcuts invocations
     */
    documentKeyupListener = (e: KeyboardEvent) => {
        /** Toggles the side menu when `ctrl+\`` on Windows or `cmd+\`` on MacOS is invoked */
        if ((e.ctrlKey || e.metaKey) && e.key === "`") {
            this.toggle = !this.toggle;
        }
        /** Focuses on the search text box when `ctrl+shift+f` on Windows or `cmd+shift+f` on MacOS is invoked */
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "f") {
            document.getElementById("searchTextBox").focus();
        }
    };

    /** The side menu toggle */
    get toggle(): boolean {
        const value: string = localStorage.getItem(SIDE_MENU_STORAGE_KEY);
        return value === null ? true : JSON.parse(value);
    }

    set toggle(value: boolean) {
        if (this.prestine) {
            this.prestine = false;
        }
        localStorage.setItem(SIDE_MENU_STORAGE_KEY, String(value));
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
        switch (e.key?.toLowerCase()) {
            case "escape":
                if (this.search === "" && this.highlighted === -1) {
                    document.getElementById("searchTextBox").blur();
                } else {
                    this.highlighted = -1;
                    this.search = "";
                }
                break;
            case "enter":
                const currentElements: HTMLCollectionOf<HTMLAnchorElement> = this.listRef.nativeElement.children;
                if (currentElements.length) {
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

    ngOnDestroy(): void {
        document.removeEventListener("keyup", this.documentKeyupListener);
    }
}
