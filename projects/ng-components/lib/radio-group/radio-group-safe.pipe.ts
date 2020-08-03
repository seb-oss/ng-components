import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "radioGroupSafeHtml" })
export class RadioGroupSafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(value: string): SafeHtml {
        if (value && value.length) {
            return this.sanitizer.bypassSecurityTrustHtml(value);
        } else {
            return "";
        }
    }
}
