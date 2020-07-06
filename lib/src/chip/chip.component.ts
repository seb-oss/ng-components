import { Component, Input, ViewEncapsulation, EventEmitter, Output } from "@angular/core";

/**
 * A new component to display a filter
 */
@Component({
    selector: "sebng-chip",
    styleUrls: ["./chip.component.scss"],
    templateUrl: "./chip.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ChipComponent {
    @Input() id?: string; // unique identifier for the chip
    @Input() className?: string; // CSS class for the component

    /** callback when chip is closed */
    @Output() onClose: EventEmitter<Event> = new EventEmitter();

    _handleClick(e: Event): void {
        this.onClose.emit(e);
    }
}
