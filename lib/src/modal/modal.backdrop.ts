import { Component, HostBinding, OnDestroy } from "@angular/core";
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
    template: "",
    selector: "div",
    host: { class: "modal-backdrop fade show" },
    animations: [
        trigger("openCloseBackdrop", [
            transition("void => *", [animate(".15s")]),
            transition("* => void", [animate(".15s", style({ opacity: 0 }))]),
        ]),
    ],
})
export class SebModalBackdropComponent implements OnDestroy {
    fadeState: boolean = true;

    @HostBinding("@openCloseBackdrop") get fade(): string {
        return this.fadeState ? "open" : "close";
    }

    ngOnDestroy(): void {
        this.fadeState = false;
    }
}
