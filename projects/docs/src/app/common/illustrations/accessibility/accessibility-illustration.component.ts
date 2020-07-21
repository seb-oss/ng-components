import { Component, Input } from "@angular/core";

@Component({
    selector: "app-disability-illustration",
    templateUrl: "./accessibility-illustration.component.html",
})
export class DisabilityIllustrationComponent {
    @Input() title?: string = "Accessibility";
    @Input() color?: string = "#007AC7";
    @Input() class?: string;
    @Input() width?: string = "100%";
    @Input() height?: string = "auto";
}
