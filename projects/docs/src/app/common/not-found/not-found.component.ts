import { Component } from "@angular/core";

@Component({
    selector: "app-not-found",
    template: `
        <div class="notfound container text-center">
            <img width="80%" src="assets/images/404.svg" alt="Page not found" />
            <h1 class="display-4">Page not found</h1>
            <a class="btn btn-primary" [routerLink]="['/']">Return Home</a>
        </div>
    `,
    styles: [
        `
            .notfound {
                margin: 3rem auto;
            }
            .notfound img {
                width: 30rem;
                max-width: 100%;
                padding: 1rem;
            }
            .notfound h1 {
                margin: 2.5rem 0;
            }
        `,
    ],
})
export class NotFoundComponent {
    constructor() {
        document.title = "Page not found! - SEB Angular Components";
    }
}
