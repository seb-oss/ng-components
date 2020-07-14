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
    @Input() id?: string;
    @Input() name?: string;
    @Input() label?: string;
    @Input() className?: string;
    @Input() type?: ButtonTypes;
    @Input() tag?: ButtonTags = "button";
    @Input() theme?: ButtonTheme;
    @Input() size?: ButtonSize;
    @Input() disabled?: boolean;
    @Input() active?: boolean;
    @Input() block?: boolean;
    @Input() href?: string;

    @Output() onClick: EventEmitter<Event> = new EventEmitter();

    ngOnInit() {
        this.type = this.type || "button";
        this.theme = this.theme || "primary";
    }

    handleClick(e: Event): void {
        this.onClick && this.onClick.emit(e);
    }
}
