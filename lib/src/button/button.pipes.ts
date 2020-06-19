import { Pipe, PipeTransform } from "@angular/core";
import { ButtonSize, ButtonTheme } from "./button.component";

@Pipe({ name: "buttonClasses" })
export class ButtonClassesPipe implements PipeTransform {
    transform(theme: ButtonTheme, size?: ButtonSize, block?: boolean, className?: string): Array<string> {
        const classes: Array<string> = ["btn", `btn-${theme}`];

        if (size) {
            classes.push(`btn-${size}`);
        }

        if (Boolean(block)) {
            classes.push("btn-block");
        }

        if (className) {
            classes.push(className);
        }

        return classes;
    }
}
