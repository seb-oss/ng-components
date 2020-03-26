import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "sebng-textlabel",
    styleUrls: ["./textLabel.component.scss"],
    templateUrl: "./textLabel.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class TextLabelComponent {
    @Input() value: any;
    @Input() label?: string;
    @Input() name?: string;
    @Input() className?: string;
}
