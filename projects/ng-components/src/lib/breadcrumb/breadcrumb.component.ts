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
    @Input() className?: string;
    @Input() id?: string;
    @Input() list: Array<string>;
    @Output() onClick: EventEmitter<ClickProps> = new EventEmitter<ClickProps>();

    handleClick(index: number, e: MouseEvent): void {
        if (index !== this.list.length - 1 && this.onClick) {
            this.onClick.emit({ index, e });
        }
    }
}
