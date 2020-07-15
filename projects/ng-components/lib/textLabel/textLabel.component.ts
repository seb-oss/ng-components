import { Component, Input, ViewEncapsulation, TemplateRef } from "@angular/core";

/** A text label is a component to display value with label */
@Component({
    selector: "sebng-textlabel",
    styleUrls: ["./textLabel.component.scss"],
    templateUrl: "./textLabel.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class TextLabelComponent {
    /** Optional id for the textLabel. */
    @Input() id?: string;
    /** Optional label for the textLabel can be a string or a template. */
    @Input() label?: string | TemplateRef<HTMLElement>;
    /** Optional label for the text label can be a string or a template. */
    @Input() value?: string | TemplateRef<HTMLElement>;
    /** Optional custom class to append to the modal. */
    @Input() className?: string | Array<string> | { [key: string]: boolean };

    /**
     * Check if input parameter is a string
     */
    isString = (input: any): boolean => {
        return typeof input === "string";
    };
}
