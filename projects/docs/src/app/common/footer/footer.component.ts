import { Component } from "@angular/core";

@Component({
    selector: "app-footer",
    template: `
        <footer class="container">
            <nav class="navbar">
                <span class="navbar-brand">Developed with ❤️ by </span>
                <span class="navbar-text">
                    <a href="https://www.npmjs.com/package/@sebgroup/ng-components" target="_blank" title="View in npm">
                        <img src="https://img.shields.io/npm/v/@sebgroup/ng-components?color=brightgreen" alt="npm version" />
                    </a>
                </span>
            </nav>
        </footer>
    `,
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {}
