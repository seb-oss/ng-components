import { Component } from "@angular/core";

@Component({
    selector: "app-footer",
    template: `
        <footer class="container border-top pt-2 pb-3 pr-0 pl-0">
            <nav class="navbar flex-row-reverse">
                <span class="navbar-brand">Developed with ❤️ by </span>
                <span class="navbar-text">{{version}}</span>
            </nav>
        </footer>
    `,
    styles: [`
        footer {
            > nav {
                > .navbar-brand {
                    padding-right: 2rem;
                    padding-left: 1rem;
                    &:before {
                        right: 0;
                        left: auto;
                    }
                }
            }
        }
    `]
})
export class FooterComponent {
    version: string = "v1.0.3";
}
