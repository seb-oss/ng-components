import { Component, Input, ViewEncapsulation } from "@angular/core";
import { ButtonTheme, ButtonType, ButtonIconPosition } from "./button.def";

@Component({
    selector: "ac-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
    @Input() label: string;
    @Input() clickAction: (event: MouseEvent) => void;
    @Input() className?: string;
    @Input() disabled?: boolean;
    @Input() theme?: ButtonTheme;
    @Input() title?: string;
    @Input() icon?: string;
    @Input() type?: ButtonType;
    @Input() iconPosition?: ButtonIconPosition;
    @Input() _id?: string;
}
