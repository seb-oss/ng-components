import { Component, Input, ViewEncapsulation, EventEmitter, Output, OnInit } from "@angular/core";

export type ButtonTheme = "primary" | "secondary" | "danger" | "outline-primary" | "outline-danger" | "dark" | "light" | "link";

export type ButtonSize = "lg" | "md" | "sm";

export type ButtonTypes = "submit" | "button" | "reset";
export type ButtonTags = "input" | "button" | "anchor";

@Component({
    selector: "sebng-button",
    templateUrl: "./button.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {
    @Input() id?: string;
    @Input() name?: string;
    @Input() label?: string;
    @Input() className?: string;
    @Input() type?: ButtonTypes;
    @Input() tag?: ButtonTags;
    @Input() theme?: ButtonTheme;
    @Input() size?: ButtonSize;
    @Input() disabled?: boolean;
    @Input() active?: boolean;
    @Input() block?: boolean;
    @Input() href?: string;

    @Output() btnClick: EventEmitter<Event> = new EventEmitter();

    ngOnInit(): void {
        this.type = this.type || "button";
        this.theme = this.theme || "primary";
    }

    handleClick(e: Event): void {
        this.btnClick && this.btnClick.emit(e);
    }
}
