import { Component } from "@angular/core";

@Component({
    selector: "app-docs-wrapper",
    template: `
        <div class="docs-wrapper">
            <app-side-menu></app-side-menu>
            <div class="content-wrapper">
                <router-outlet></router-outlet>
                <app-footer></app-footer>
            </div>
        </div>
    `,
    styleUrls: ["./docs-wrapper.component.scss"],
})
export class DocsWrapperComponent {}
