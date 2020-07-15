import { Component, Input, ViewEncapsulation, EventEmitter, Output, OnInit } from "@angular/core";

export type ButtonTheme = "primary" | "secondary" | "danger" | "outline-primary" | "outline-danger" | "dark" | "light" | "link";

export type ButtonSize = "lg" | "md" | "sm";
export type ButtonIconPosition = "right" | "left";

export type ButtonTypes = "submit" | "button" | "reset";
export type ButtonTags = "input" | "button" | "anchor";

/** Buttons allow users to take action with a single tap. */
@Component({
    selector: "sebng-button",
    styleUrls: ["./button.component.scss"],
    templateUrl: "./button.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {
    /** Element ID */
    @Input() id?: string;
    /** Element name */
    @Input() name?: string;
    /** Element label */
    @Input() label?: string;
    /** Element class name */
    @Input() className?: string;
    /** Button type: "submit" | "button" | "reset" */
    @Input() type?: ButtonTypes;
    /** Button tag: "input" | "button" | "anchor" */
    @Input() tag?: ButtonTags = "button";
    /** Button theme: "primary" | "secondary" | "danger" | "outline-primary" | "outline-danger" | "dark" | "light" | "link" */
    @Input() theme?: ButtonTheme;
    /** Button size: "lg" | "md" | "sm" */
    @Input() size?: ButtonSize;
    /** Property sets whether a button is disabled */
    @Input() disabled?: boolean;
    /** Property sets whether a button is active */
    @Input() active?: boolean;
    /** Property sets whether a button is a block button */
    @Input() block?: boolean;
    /** Href link for anchor tag */
    @Input() href?: string;
    /** Callback when button is clicked */
    @Output() onClick: EventEmitter<Event> = new EventEmitter();

    ngOnInit() {
        this.type = this.type || "button";
        this.theme = this.theme || "primary";
    }

    handleClick(e: Event): void {
        this.onClick && this.onClick.emit(e);
    }
}
