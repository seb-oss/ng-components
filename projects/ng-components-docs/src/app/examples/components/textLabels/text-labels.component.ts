import { Component } from "@angular/core";

@Component({
    selector: "app-textlabel",
    templateUrl: "./text-labels.component.html",
})
export class TextLabelComponent {
    classNames: { [key: string]: boolean };
    constructor() {
        this.classNames = { hello: true };
    }
}
