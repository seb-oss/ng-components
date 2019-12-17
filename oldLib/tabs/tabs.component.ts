import { Component, Input, ViewEncapsulation, ViewChildren, ElementRef, QueryList } from "@angular/core";

export interface TabsListItem {
    text: string;
    disabled?: boolean;
}

@Component({
    selector: "ac-tabs",
    styleUrls: ["./tabs.component.scss"],
    templateUrl: "./tabs.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TabsComponent {
    @Input() list: Array<TabsListItem>;
    @Input() activeTab: number;
    @Input() clickAction?: (index: number) => void;
    @Input() className?: string;

    @ViewChildren("tabRef") elementRefAnchor: QueryList<ElementRef>;

    /**
     *
     * @param i index
     */
    setTabIndex(i: number): string {
        return Math.floor(this.activeTab) === (i) ? "0" : "-1";
    }

    /**
     * @param e: keyboard event
     * @param key: number listIndex or key
     */
    onKeyDown(e: KeyboardEvent): void {
        if (this.activeTab < this.list.length && this.activeTab >= 0) {
            const previousTabIsEnabled = this.list[this.activeTab - 1] && !this.list[this.activeTab - 1].disabled;
            if ((e.key.toLowerCase() === "arrowleft" || e.key.toLowerCase() === "arrowdown") && previousTabIsEnabled && this.clickAction) {
                const selectedHtml: HTMLElement = this.elementRefAnchor.toArray()[this.activeTab - 1].nativeElement;
                selectedHtml.setAttribute("aria-selected", "true");
                selectedHtml.setAttribute("tabIndex", "0");
                selectedHtml.setAttribute("class", "nav-link active");
                selectedHtml.focus();

                this.clickAction(this.activeTab - 1);
                this.activeTab = this.activeTab - 1;
            } else if ((e.key.toLowerCase() === "arrowright" || e.key.toLowerCase() === "arrowup") && !this.list[this.activeTab + 1].disabled && this.clickAction) {
                const selectedHtml: HTMLElement = this.elementRefAnchor.toArray()[this.activeTab + 1].nativeElement;

                selectedHtml.setAttribute("aria-selected", "true");
                selectedHtml.setAttribute("tabIndex", "0");
                selectedHtml.setAttribute("class", "nav-link active");
                selectedHtml.focus();

                this.clickAction(this.activeTab + 1);
                this.activeTab = this.activeTab + 1;
            }
        }
    }

}
