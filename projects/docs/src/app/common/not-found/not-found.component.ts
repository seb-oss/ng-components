import { Component } from "@angular/core";

@Component({
    selector: "app-not-found",
    template: `
        <div class="container text-center m-5">
            <img width="80%" src="assets/404.svg" alt="Page not found" />
            <h1 class="display-4 my-4">Page not found</h1>
            <a class="btn btn-primary" [routerLink]="['/']">Return Home</a>
        </div>
    `,
})
export class NotFoundComponent {
    constructor() {
        document.title = "Page not found! - SEB Angular Components";
    }
}
