import { Directive, ElementRef, HostBinding, Input } from "@angular/core";

export type SebButtonType = "primary" | "secondary" | "link" | "light";
export type SebButtonSize = "lg" | "sm" | null;

@Directive({
    selector: "button[sebng-btn], a[sebng-btn], span[sebmg-btn], input[sebng-btn]",
    host: {
        "[class.btn-lg]": 'size === "lg"',
        "[class.btn-sm]": 'size === "sm"',
    },
})
export class SebButtonDirective {
    @HostBinding("class.btn") _btn = true;
    @HostBinding("attr.disabled") _disabled = null;

    @Input("seb-btn")
    get type(): SebButtonType {
        return this._type;
    }

    set type(value: SebButtonType) {
        if (value && value !== this._type) {
            this._removeClasses();
            this._type = value;
            this._setClasses();
        }
    }

    private _type: SebButtonType = "primary";

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = `${value}` === "true" ? true : null;
    }

    @Input()
    get outline(): boolean {
        return this._outline;
    }

    set outline(value: boolean) {
        value = value != null && `${value}` !== "false";

        if (this._outline !== value) {
            this._removeClasses();
            this._outline = value;
            this._setClasses();
        }
    }

    private _outline: boolean = false;

    @Input()
    get size(): SebButtonSize {
        return this._size;
    }

    set size(value: SebButtonSize) {
        this._size = value;
    }

    private _size: SebButtonSize = null;

    constructor(public elementRef: ElementRef) {
        this._setClasses();
    }

    private _setClasses() {
        const styleClass = this.outline ? `btn-outline-${this.type}` : `btn-${this.type}`;
        this.elementRef.nativeElement.classList.add(styleClass);
    }

    public _removeClasses() {
        const styleClass = this.outline ? `btn-outline-${this.type}` : `btn-${this.type}`;
        this.elementRef.nativeElement.classList.remove(styleClass);
    }
}
