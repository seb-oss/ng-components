import { ViewEncapsulation, Component, Input } from "@angular/core";

export type ProggressTheme = "success" | "warning" | "danger" | "info";
@Component({
    selector: "sebng-progressBar",
    styleUrls: ["./progressBar.component.scss"],
    templateUrl: "./progressBar.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent {
    @Input() value: number;
    @Input() height?: number;
    @Input() className?: string;
    @Input() id?: string;
    @Input() showProgress?: boolean;
    @Input() striped?: boolean;
    @Input() animated?: boolean;
    @Input() theme?: ProggressTheme;
}
