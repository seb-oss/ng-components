import { Component, Input } from "@angular/core";

@Component({
    selector: "app-design-team-illustration",
    templateUrl: "./design-team-illustration.component.html",
})
export class DesignTeamIllustrationComponent {
    @Input() title?: string = "Design team";
    @Input() color?: string = "#007AC7";
    @Input() class?: string;
    @Input() width?: string = "100%";
    @Input() height?: string = "auto";
}
