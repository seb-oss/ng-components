import { Component } from "@angular/core";

@Component({
    selector: "app-footer",
    template: `
        <footer class="container">
            <nav class="navbar">
                <span class="navbar-brand">Developed with ❤️ by </span>
                <span class="navbar-text">{{ version }}</span>
            </nav>
        </footer>
    `,
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
    version: string = "v1.0.3";
}
