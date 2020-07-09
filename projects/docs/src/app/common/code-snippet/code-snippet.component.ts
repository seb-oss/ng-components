import { Component, Input } from "@angular/core";

@Component({
    selector: "app-code-snippet",
    template: `
        <code [lang]="lang">
            <ng-content></ng-content>
        </code>
    `,
    styleUrls: ["./code-snippet.component.scss"]
})
export class CodeSnippetComponent {
    @Input() lang?: string = "";
}
