import { Component, Input, HostBinding } from "@angular/core";

export type ProggressTheme = "success" | "warning" | "danger" | "info";
export interface BarItem {
    value: number;
    striped?: boolean;
    showProgress?: boolean;
    animated?: boolean;
    theme?: ProggressTheme;
}

/** A component which indicates progress */
@Component({
    selector: "sebng-progress-bar",
    templateUrl: "./progressbar.component.html",
})
export class ProgressBarComponent {
    /** Value of progress bar */
    @Input() value?: number;
    /* Visual height of progress bar */
    @Input() height?: number;
    /** Element class name */
    @Input() className?: string;
    /** Element ID */
    @Input() id?: string;
    /** Show progress percentage value in text */
    @Input() showProgress?: boolean;
    /** Show progress bar with striped style */
    @Input() striped?: boolean;
    /** Show progress bar with animation */
    @Input() animated?: boolean;
    /** Progress bar theme, "success" | "warning" | "danger" | "info" */
    @Input() theme?: ProggressTheme;
    /** Display progress in multiple bars */
    @Input() multiBars?: Array<BarItem>;
    @HostBinding("style") styles: string = "width: 100%;";
}
