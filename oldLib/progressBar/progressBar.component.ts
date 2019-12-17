import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ac-progress",
    styleUrls: ["./progressBar.component.scss"],
    templateUrl: "./progressBar.component.html",
    encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent {
    @Input() value: number;
    @Input() showProgress?: boolean;
    @Input() className?: string;
}
