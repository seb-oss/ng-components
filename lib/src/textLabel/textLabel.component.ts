import { Component, Input, ViewEncapsulation, TemplateRef } from "@angular/core";

@Component({
    selector: "sebng-textlabel",
    styleUrls: ["./textLabel.component.scss"],
    templateUrl: "./textLabel.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class TextLabelComponent {
    @Input() id?: string;
    @Input() label?: string | TemplateRef<HTMLElement>;
    @Input() value?: string | TemplateRef<HTMLElement>;
    @Input() className?: string | Array<string> | { [key: string]: boolean };

    constructor() {
        console.log("here");
    }

    /**
     * Check if input parameter is a string
     */
    isString = (input: any): boolean => {
        return typeof input == "string";
    };
}
