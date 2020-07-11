import { Component, Input, TemplateRef, ViewChildren, QueryList, ElementRef, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export interface TabsListItem {
    text: string;
    disabled?: boolean;
}

@Component({
    selector: "sebng-tabs",
    templateUrl: "./tabs.component.html",
    styles: [
        `
            .nav-tabs > .nav-item.active > .nav-link.active {
                cursor: default;
            }
        `,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TabsComponent),
            multi: true,
        },
    ],
})
export class TabsComponent implements ControlValueAccessor {
    @Input() id?: string;
    @Input() label?: string | TemplateRef<HTMLElement>;
    @Input() className?: string;
    @Input() list: Array<TabsListItem>;

    @ViewChildren("tabListRefs") tabListRefs: QueryList<ElementRef>;

    private _value: number;

    /**
     * Handles on tab click event
     * @param {React.MouseEvent<HTMLAnchorElement>} e Click event
     * @param {number} index The index of the tab clicked
     */
    handleClick(e: MouseEvent): void {
        e.preventDefault();
        const index: number = parseFloat((e.target as HTMLAnchorElement).dataset.value);
        this.value = index;
    }

    // Whatever name for this (myValue) you choose here, use it in the .html file.
    get value(): number {
        return this._value;
    }

    @Input("value") set value(v: number) {
        if (v !== this._value && !isNaN(v)) {
            this._value = v;
            this.onChange(v);
        }
    }

    onChange = (_: any) => {};
    onTouched = () => {};

    writeValue(value: any): void {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error("Method not implemented.");
    }
}
