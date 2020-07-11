import { Component, Input } from "@angular/core";

@Component({
    selector: "app-doc-apis",
    templateUrl: "./apis.component.html",
    styleUrls: ["./apis.component.scss"],
})
export class APIsComponent {
    @Input() inputs: Array<APIInputs>;
    @Input() outputs: Array<APIOutputs>;
}
