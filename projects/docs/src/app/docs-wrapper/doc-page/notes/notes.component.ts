import { Component } from "@angular/core";

@Component({
    selector: "app-doc-notes",
    template: `<div class="card"><ng-content></ng-content></div>`,
    styles: [
        `
            .card {
                padding: 1rem 2rem;
                border-radius: 10px;
                overflow: hidden;
            }
        `,
    ],
})
export class DocNotesComponent {}
