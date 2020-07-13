import { Component, Input } from "@angular/core";

@Component({
    selector: "app-doc-apis",
    templateUrl: "./apis.component.html",
    styles: [
        `
            .card {
                border-radius: 10px;
                overflow: hidden;
            }
            .card table {
                margin: 0;
            }
            .card:not(:first-child) {
                margin-top: 1rem;
            }
        `,
    ],
})
export class APIsComponent {
    @Input() inputs: Array<APIInputs>;
    @Input() outputs: Array<APIOutputs>;
}
