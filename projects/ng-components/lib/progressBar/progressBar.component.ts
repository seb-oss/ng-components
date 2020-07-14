import { Component, Input, HostBinding } from "@angular/core";

export type ProggressTheme = "success" | "warning" | "danger" | "info";
export interface BarItem {
    value: number;
    striped?: boolean;
    showProgress?: boolean;
    animated?: boolean;
    theme?: ProggressTheme;
}

@Component({
    selector: "sebng-progress-bar",
    templateUrl: "./progressbar.component.html",
})
export class ProgressBarComponent {
    @Input() value?: number;
    @Input() height?: number;
    @Input() className?: string;
    @Input() id?: string;
    @Input() showProgress?: boolean;
    @Input() striped?: boolean;
    @Input() animated?: boolean;
    @Input() theme?: ProggressTheme;
    @Input() multiBars?: Array<BarItem>;
    @HostBinding("style") styles: string = "width: 100%;";
}
