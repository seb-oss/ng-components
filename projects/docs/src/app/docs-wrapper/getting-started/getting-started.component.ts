import { Component } from "@angular/core";

@Component({
    selector: "app-getting-started",
    template: `
        <div class="container">
            <h1 class="pt-5 pb-3">Getting started</h1>
            <h4 class="font-weight-normal">How to get started using SEB Angular components</h4>

            <div body class="alert alert-warning rounded mt-3 py-3" role="alert">
                <strong>&#9888; The library is still in beta stage so expect things to change (please provide feedback if you can)</strong>
            </div>

            <h2 class="pt-3 pb-3">Installation</h2>
            <p>First, install the npm package using the following:</p>
            <app-code-snippet [languages]="['properties']">npm install @sebgroup/ng-components@beta --save</app-code-snippet>

            <p>
                These components uses SEB Bootstrap for styling and relies on its styles, fonts, colors and variables. You will need to
                install the SEB Bootstrap package as well to get it to work.
            </p>
            <app-code-snippet [languages]="['properties']">npm install @sebgroup/bootstrap --save</app-code-snippet>

            <p>Then make sure you import SEB Bootstrap in your root styles files:</p>
            <app-code-snippet [languages]="['scss']">@import "~@sebgroup/bootstrap/scss/bootstrap";</app-code-snippet>

            <hr />

            <section id="technical-stack">
                <div class="container py-5">
                    <h2 class="mb-5">Technical stack</h2>
                    <app-tech-stack></app-tech-stack>
                </div>
            </section>
        </div>
    `,
})
export class GettingStartedComponent {
    constructor() {
        document.title = "Getting started - SEB Angular Components";
    }
}
