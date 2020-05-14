import { DomSanitizer } from "@angular/platform-browser";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "dynamicStyle" })
export class DynamicStylePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(value: Array<number>, index: number) {
        return new Promise((resolve, reject) => {
            resolve(value[index] + "px");
        });
    }
}
