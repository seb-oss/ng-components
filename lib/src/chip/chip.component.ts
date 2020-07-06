import { Component, Input, ViewEncapsulation, EventEmitter, Output } from "@angular/core";

/**
 * A component to display a filter
 */
@Component({
    selector: "sebng-chip",
    styleUrls: ["./chip.component.scss"],
    templateUrl: "./chip.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ChipComponent {
    /**
     *  unique identifier
     */
    @Input() id?: string;
    /**
     *  CSS class
     */
    @Input() className?: string;
    /** callback when chip is closed */
    @Output() onClose: EventEmitter<Event> = new EventEmitter();

    _handleClick(e: Event): void {
        this.onClose.emit(e);
    }
}
