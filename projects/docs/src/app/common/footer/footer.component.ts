import { Component } from "@angular/core";

@Component({
    selector: "app-footer",
    template: `
        <footer class="container">
            <nav class="navbar">
                <div class="navbar-brand">Developed with ❤️ by <a href="https://seb.se" target="_blank"></a></div>
                <div class="navbar-text">
                    <a href="https://www.npmjs.com/package/@sebgroup/ng-components/v/beta" target="_blank" title="View in npm">
                        <img src="https://img.shields.io/npm/v/@sebgroup/ng-components/beta" alt="npm version" />
                    </a>
                </div>
            </nav>
        </footer>
    `,
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {}
