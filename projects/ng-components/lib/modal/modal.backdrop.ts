import { Component, HostBinding, OnDestroy, NgModule, Input } from "@angular/core";
import { trigger, style, transition, animate } from "@angular/animations";

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
    @Input() customClass?: string;
    fadeState: boolean = true;
    @HostBinding("class") get className(): string {
        return this.customClass;
    }
    @HostBinding("@openCloseBackdrop") get fade(): string {
        return this.fadeState ? "open" : "close";
    }

    ngOnDestroy(): void {
        this.fadeState = false;
    }
}

@NgModule({
    declarations: [SebModalBackdropComponent],
})
export class SebModalBackdropModule {}
