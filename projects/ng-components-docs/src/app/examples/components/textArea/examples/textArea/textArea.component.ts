import { Component } from "@angular/core";

@Component({
    selector: "app-textarea",
    templateUrl: "./textArea.component.html",
})
export class TextAreaComponent {
    textBoxValue: string;

    onChange(value: string) {}
}
