import { DomSanitizer } from "@angular/platform-browser";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value: any) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}
