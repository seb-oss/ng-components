import { Component, Input, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
    selector: "app-code-snippet",
    template: `
        <code class="code-snippet" [class.fill]="fillMode" [lang]="lang">
            <ng-content></ng-content>
        </code>
    `,
    styleUrls: ["./code-snippet.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CodeSnippetComponent {
    @Input() lang?: string = "";
    @Input() fillMode?: boolean = false;
    @HostBinding("class") classes = "w-100";
}
