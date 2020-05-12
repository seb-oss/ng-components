import { Component, Input, ViewEncapsulation, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "sebng-chip",
    styleUrls: ["./chip.component.scss"],
    templateUrl: "./chip.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ChipComponent {
    @Input() id?: string;
    @Input() className?: string;
    @Output() onClose: EventEmitter<Event> = new EventEmitter();

    handleClick(e: Event): void {
        this.onClose.emit(e);
    }
}
