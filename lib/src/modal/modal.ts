import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit } from "@angular/core";
import { SebModalRef } from "./modal.ref";
import { DOCUMENT } from "@angular/common";
import { FocusTrap, FocusTrapFactory } from "../core/focus/focus.trap";

@Component({
    templateUrl: "modal.html",
    host: {
        "[class]": '"modal fade show d-block"',
        "[class.modal-fullscreen]": 'modalRef?.config?.type === "fullscreen"',
        "[class.modal-aside]": 'modalRef?.config?.type === "aside-left" || modalRef?.config?.type === "aside-right"',
        "[class.modal-aside-left]": 'modalRef?.config?.type === "aside-left"',
        "[class.modal-aside-right]": 'modalRef?.config?.type === "aside-right"',
        tabindex: "-1",
        role: "dialog",
    },
})
export class SebModalComponent implements OnInit, OnDestroy {
    private focusTrap: FocusTrap;
    public modalRef: SebModalRef;

    constructor(private elementRef: ElementRef, private focusTrapFactory: FocusTrapFactory, @Inject(DOCUMENT) private document) {}

    @HostListener("keyup.esc") onEscKey() {
        this._close();
    }
    @HostListener("click", ["$event.target"]) onBackdropClick(target) {
        if (this.elementRef.nativeElement !== target) {
            return;
        }
        this._close();
    }

    ngOnInit(): void {
        this.focusTrap = this.focusTrapFactory.trapFocus(this.elementRef.nativeElement);
    }

    private _close() {
        if (this.modalRef && this.modalRef.config && this.modalRef.config.closable) {
            this.modalRef.close();
        }
    }

    ngOnDestroy(): void {
        if (this.focusTrap) {
            this.focusTrap.restoreFocus();
        }
    }
}
