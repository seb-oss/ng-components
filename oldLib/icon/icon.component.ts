import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ac-icon",
    templateUrl: "./icon.component.html",
    styleUrls: ["./icon.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class IconComponent {
    @Input() src: string;
    @Input() title?: string;
    @Input() className?: string;
    @Input() clickAction?: (e?: any) => void;
}
