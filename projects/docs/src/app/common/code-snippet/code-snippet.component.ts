import { Component, Input, ViewEncapsulation, HostBinding, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: "app-code-snippet",
    template: `
        <!-- This is where the original code snippet is kept for copying to clipboard -->
        <span class="d-none" #originalCodeHolder><ng-content></ng-content></span>
        <div class="code-snippet">
            <code [class.fill]="fillMode" [lang]="lang">
                {{ originalCodeHolder.innerText }}
            </code>
            <div class="copy-snippet" (click)="copySnippet()"><app-files-icon></app-files-icon></div>
        </div>
    `,
    styleUrls: ["./code-snippet.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CodeSnippetComponent {
    /** Programming language. (e.g. `html`) */
    @Input() lang?: string = "";
    /** Fill mode allows the code snippet to span across the width and height of its container */
    @Input() fillMode?: boolean = false;
    /** Appending this class name that forces the Angular custom HTML tag to span the whole width of the container */
    @HostBinding("class") classes = "w-100";
    /** This is kept so that copying the code will copy the original code snippet, not the processed with syntax highlighting */
    @ViewChild("originalCodeHolder") codeHolder: ElementRef<HTMLSpanElement>;

    /** Copy the code snippet to the clipboard */
    copySnippet(): void {
        navigator.clipboard.writeText(this.codeHolder.nativeElement.innerText);
    }
}
