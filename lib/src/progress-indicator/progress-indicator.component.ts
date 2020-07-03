import { ViewEncapsulation, Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

export type ProggressTheme = "success" | "warning" | "danger" | "info";
export interface BarItem {
    value: number;
    striped?: boolean;
    showProgress?: boolean;
    animated?: boolean;
    theme?: ProggressTheme;
}
/**
 * a component
 */
@Component({
    selector: "sebng-progress-indicator",
    templateUrl: "./progress-indicator.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ProgressIndicatorComponent implements OnInit {
    /**
     * valuee eueue ududu
     */
    @Input() value?: number = null; // testtta ads fsdf

    /**
     * test seb btn
     */
    @Input("seb-btn")
    set type(value: string) {
        this._type = value;
    }

    get type(): string {
        return this._type;
    }
    /** classname to describe class */
    @Input() className: string = ""; // classname y'all
    @Input() id?: string; // id y'all
    @Input() showProgress?: boolean;
    @Input() striped?: boolean;
    @Input() animated?: boolean;
    @Input() theme?: ProggressTheme;
    /**hgjghgjhgj jhgjhfgjhg */
    @Output() multiBars?: EventEmitter<boolean> = new EventEmitter();

    _type: string = "";

    ngOnInit() {}

    /**
     * test function
     */
    test() {}
}
