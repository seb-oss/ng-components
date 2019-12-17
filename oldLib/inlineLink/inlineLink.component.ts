import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ac-inline-link",
    styleUrls: ["./inlineLink.component.scss"],
    templateUrl: "inlineLink.component.html",
    encapsulation: ViewEncapsulation.None
})
export class InlineLinkComponent {
    @Input() clickAction?: () => void;
    @Input() className?: string;
}
