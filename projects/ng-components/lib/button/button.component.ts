import { Component, Input, ViewEncapsulation, HostBinding } from "@angular/core";

export type ButtonTheme = "primary" | "secondary" | "danger" | "outline-primary" | "outline-danger" | "dark" | "light" | "link";
export type ButtonSize = "lg" | "md" | "sm";
export type ButtonIconPosition = "right" | "left";
export type ButtonType = "submit" | "button" | "reset";
export type ButtonTag = "input" | "button" | "anchor";

/** Buttons allow users to take action with a single tap. */
@Component({
    selector: "sebng-button",
    templateUrl: "./button.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
    /** Element ID */
    @Input() id?: string;
    /** Element name */
    @Input() name?: string;
    /** Element label */
    @Input() label?: string;
    /** Element class */
    @Input() className?: string;
    /** Button type can be either `button`, `submit` or `reset`. Default is `button` */
    @Input() type?: ButtonType = "button";
    /** Button tag can be either `button`, `input` or `anchor`. Default is `button` */
    @Input() tag?: ButtonTag = "button";
    /** Button theme follows bootstrap theme names. Default is `primary` */
    @Input() theme?: ButtonTheme = "primary";
    /** Button size can be either `sm`, `md` or `lg`. Default is `md` */
    @Input() size?: ButtonSize = "md";
    /** Element disabled state */
    @Input() disabled?: boolean;
    /** Displays the button as a block spanning the full width of its parent */
    @Input() block?: boolean;
    /** Element href value. Only works when tag is set tot `anchor` */
    @Input() href?: string;
    /** Element title */
    @Input() title?: string;

    @HostBinding("style") get styles(): string | null {
        return this.block ? "width: 100%;" : null;
    }
}
