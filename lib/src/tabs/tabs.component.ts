import { Component, Input, ViewEncapsulation, TemplateRef, ViewChildren, QueryList, ElementRef, EventEmitter, Output } from "@angular/core";

export interface TabsListItem {
    text: string;
    disabled?: boolean;
}

@Component({
    selector: "sebng-tabs",
    styleUrls: ["./tabs.component.scss"],
    templateUrl: "./tabs.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class TabsComponent {
    @Input() id?: string;
    @Input() label?: string | TemplateRef<HTMLElement>;
    @Input() className?: string;

    @Input() activeTab: number;
    @Input() list: Array<TabsListItem>;
    @Output() onClick = new EventEmitter<number>();

    @ViewChildren("tabListRefs") tabListRefs: QueryList<ElementRef>;

    /**
     * Handles on tab click event
     * @param {React.MouseEvent<HTMLAnchorElement>} e Click event
     * @param {number} index The index of the tab clicked
     */
    handleClick(e: Event, index: number): void {
        if (this.onClick && !this.list[index].disabled) {
            this.onClick.emit(index);
        }
    }

    /**
     * Handle on keydown event to support accessibility
     * @param {KeyboardEvent<HTMLAnchorElement>} e Key down event
     */
    onKeyDown(e: KeyboardEvent, index: number): void {
        if (this.activeTab < this.list.length && this.activeTab >= 0) {
            const previousTabIsEnabled = this.list[this.activeTab - 1] && !this.list[this.activeTab - 1].disabled;
            if ((e.key.toLowerCase() === "arrowleft" || e.key.toLowerCase() === "arrowdown") && previousTabIsEnabled && this.onClick) {
                const selectedHtml: ElementRef = this.tabListRefs.toArray()[this.activeTab - 1];
                selectedHtml.nativeElement.setAttribute("aria-selected", "true");
                selectedHtml.nativeElement.setAttribute("tabIndex", "0");
                selectedHtml.nativeElement.setAttribute("class", "nav-link active");
                selectedHtml.nativeElement.focus();
                this.onClick.emit(this.activeTab - 1);
            } else if (
                (e.key.toLowerCase() === "arrowright" || e.key.toLowerCase() === "arrowup") &&
                !this.list[this.activeTab + 1].disabled &&
                this.onClick
            ) {
                const selectedHtml: ElementRef = this.tabListRefs.toArray()[this.activeTab + 1];
                selectedHtml.nativeElement.setAttribute("aria-selected", "true");
                selectedHtml.nativeElement.setAttribute("tabIndex", "0");
                selectedHtml.nativeElement.setAttribute("class", "nav-link active");
                selectedHtml.nativeElement.focus();
                this.onClick.emit(this.activeTab + 1);
            } else if (e.key.toLowerCase() === "enter" || e.key === " " || e.key.toLowerCase() === "space") {
                const selectedHtml: ElementRef = this.tabListRefs.toArray()[index];
                selectedHtml.nativeElement.setAttribute("aria-selected", "true");
                selectedHtml.nativeElement.setAttribute("tabIndex", "0");
                selectedHtml.nativeElement.setAttribute("class", "nav-link active");
                selectedHtml.nativeElement.focus();
                this.onClick.emit(index);
            }
        }
    }
}
