import { Size } from "./loader.def";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "sizeClassPipe" })
export class SizeClassPipe implements PipeTransform {
    transform(value: Size, sizeClass: string) {
        if (sizeClass) {
            return sizeClass;
        }
        switch (value) {
            case "large":
                return "loader-lg";
            case "small":
                return "loader-sm";
            case "extraLarge":
                return "loader-xl";
            case "medium":
                return "loader-md";
            case "tiny":
                return "loader-xs";
            default:
                return "loader-sm";
        }
    }
}
