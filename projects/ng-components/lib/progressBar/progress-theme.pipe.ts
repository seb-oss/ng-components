import { Pipe, PipeTransform } from "@angular/core";
import { ProggressTheme } from "./progressbar.component";

@Pipe({ name: "progressTheme" })
export class ProgressThemePipe implements PipeTransform {
    transform(value: ProggressTheme) {
        switch (value) {
            case "danger":
                return "bg-danger";
            case "warning":
                return "bg-warning";
            case "info":
                return "bg-info";
            default:
                return "bg-success";
        }
    }
}
