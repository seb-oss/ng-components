import { Component, ViewEncapsulation, Input, Output, EventEmitter } from "@angular/core";

export interface ClickProps {
    index: number;
    e: MouseEvent;
}

/** A breadcrumb is a secondary navigation showing the website hierarchy. */
@Component({
    selector: "sebng-breadcrumb",
    templateUrl: "./breadcrumb.component.html",
    styleUrls: ["./breadcrumb.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent {
    /** Element class name */
    @Input() className?: string;
    /** Element ID */
    @Input() id?: string;
    /** Breadcrumb list */
    @Input() list: Array<string>;
    /** Onclick callback when breadcrumb item is clicked */
    @Output() onClick: EventEmitter<ClickProps> = new EventEmitter<ClickProps>();

    handleClick(index: number, e: MouseEvent): void {
        if (index !== this.list.length - 1 && this.onClick) {
            this.onClick.emit({ index, e });
        }
    }
}
