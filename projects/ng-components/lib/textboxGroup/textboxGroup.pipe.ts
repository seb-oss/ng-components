import { DomSanitizer } from "@angular/platform-browser";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "safeHtml" })
export class TextboxGroupSafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(value: string) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
