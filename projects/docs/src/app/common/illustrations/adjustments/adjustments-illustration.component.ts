import { Component, Input } from "@angular/core";

@Component({
    selector: "app-adjustments-illustration",
    templateUrl: "./adjustments-illustration.component.html",
})
export class AdjustmentsIllustrationComponent {
    @Input() title?: string = "Adjustments";
    @Input() color?: string = "#007AC7";
    @Input() class?: string;
    @Input() width?: string = "100%";
    @Input() height?: string = "auto";
}
