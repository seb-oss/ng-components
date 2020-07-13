import { Component, Input } from "@angular/core";

@Component({
    selector: "app-doc-apis",
    templateUrl: "./apis.component.html",
    styles: [
        `
            .card {
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 1rem;
            }
            .card table {
                margin: 0;
            }
        `,
    ],
})
export class APIsComponent {
    @Input() inputs: Array<APIInputs>;
    @Input() outputs: Array<APIOutputs>;
}
