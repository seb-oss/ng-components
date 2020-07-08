import { Pipe, PipeTransform } from "@angular/core";
import { ButtonSize, ButtonTheme } from "./button.component";

@Pipe({ name: "buttonClasses" })
export class ButtonClassesPipe implements PipeTransform {
    transform(theme: ButtonTheme, size?: ButtonSize, block?: boolean, className?: string): Array<string> {
        const classes: Array<string> = ["btn", `btn-${theme}`];

        !!size && classes.push(`btn-${size}`);
        !!block && classes.push("btn-block");
        !!className && classes.push(className);

        return classes;
    }
}
