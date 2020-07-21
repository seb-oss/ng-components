import { Component } from "@angular/core";

@Component({
    selector: "app-collapse-page",
    template: `
        <app-doc-page [class]="'align-example-normal'" [importString]="importString">
            <div class="align-items-normal" example>
                <sebng-collapse [toggle]="toggle">
                    <p class="border border-danger p-3">
                        Provident consequatur omnis vitae aut saepe. Quis autem aliquam tenetur. Officiis quia est dolorem quaerat sed rerum
                        omnis explicabo nam. Quo praesentium rerum quia beatae aspernatur dolorem laudantium aperiam. Sed libero inventore.
                        Exercitationem et delectus facilis possimus ad autem.
                    </p>
                </sebng-collapse>
            </div>
            <div controls>
                <sebng-toggle label="Collapse toggle" [(ngModel)]="toggle"></sebng-toggle>
            </div>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
    styles: [
        `
            ::ng-deep .doc-page.align-example-normal .playground.card .example {
                align-items: normal;
            }
        `,
    ],
})
export class CollapsePageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/collapse/collapse.component");
    snippet: string = `<sebng-collapse [toggle]="toggle"></sebng-collapse>`;
    toggle: boolean = true;

    constructor() {
        document.title = "Collapse - SEB Angular Components";
    }
}
