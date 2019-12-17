import { Component, Input, ViewEncapsulation, Output } from "@angular/core";

@Component({
    selector: "ac-breadcrumb",
    templateUrl: "./breadcrumb.component.html",
    styleUrls: ["./breadcrumb.component.scss"],
    encapsulation:  ViewEncapsulation.None
})
export class BreadcrumbComponent {
    @Input() list: Array<string>;
    @Input() clickAction: (event: MouseEvent) => void;
    @Input() className?: string;
    @Input() id?: string;
}
