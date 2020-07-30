import { Component, Input, ViewEncapsulation, HostBinding, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: "app-code-snippet",
    template: `
        <!-- This is where the original code snippet is kept for copying to clipboard -->
        <span class="d-none" #originalCodeHolder><ng-content></ng-content></span>
        <div class="code-snippet" [ngSwitch]="copied">
            <pre [class.fill]="fillMode"><code [highlight]="originalCodeHolder.innerText" [languages]="languages"></code></pre>
            <div title="Copy" *ngSwitchCase="false" class="snippet-icon copy" (click)="copySnippet()">
                <app-files-icon></app-files-icon>
            </div>
            <div title="Copied!" *ngSwitchCase="true" class="snippet-icon check">
                <app-check-icon></app-check-icon>
            </div>
        </div>
    `,
    styleUrls: ["./code-snippet.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CodeSnippetComponent {
    /** Fill mode allows the code snippet to span across the width and height of its container */
    @Input() fillMode?: boolean = false;
    @Input() languages?: HighlightLanguages;
    /** Appending this class name that forces the Angular custom HTML tag to span the whole width of the container */
    @HostBinding("style") styles = "width: 100%; height: 100%;";
    /** This is kept so that copying the code will copy the original code snippet, not the processed with syntax highlighting */
    @ViewChild("originalCodeHolder") codeHolder: ElementRef<HTMLSpanElement>;

    copied: boolean = false;
    timer: { current: any } = { current: null };

    /** Copy the code snippet to the clipboard */
    copySnippet(): void {
        navigator.clipboard.writeText(this.codeHolder.nativeElement.innerText).then(() => {
            this.copied = true;
            this.timer.current = setTimeout(() => {
                if (this.timer.current) {
                    this.copied = false;
                    clearTimeout(this.timer.current);
                }
            }, 3000);
        });
    }
}
