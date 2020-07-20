import { Component } from "@angular/core";

@Component({
    selector: "app-doc-notes",
    template: `<div class="card"><ng-content></ng-content></div>`,
    styleUrls: ["./notes.component.scss"],
})
export class DocNotesComponent {}
