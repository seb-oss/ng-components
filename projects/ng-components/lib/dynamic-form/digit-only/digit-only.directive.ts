import { Directive, ElementRef, HostListener, NgModule, AfterViewInit, Input, AfterViewChecked, ChangeDetectorRef } from "@angular/core";
import { formatNumber } from "@angular/common";
import { ExtendedFormControl } from "../model/custom-classes/extended-form-control";

@Directive({
    selector: "[digitsOnly]",
})
export class DigitOnlyDirective implements AfterViewInit, AfterViewChecked {
    inputElement: HTMLInputElement;
    element: ElementRef;
    @Input() formControl: ExtendedFormControl;

    constructor(public el: ElementRef, private cd: ChangeDetectorRef) {
        this.element = el;
    }

    ngAfterViewInit(): void {
        this.inputElement = this.element.nativeElement.querySelector("input");
    }

    ngAfterViewChecked(): void {
        const { formattedValue } = this.formatValue();
        this.inputElement.value = formattedValue;
    }

    @HostListener("input", ["$event"])
    onInputChange(event: Event) {
        const { initialValue, value, formattedValue } = this.formatValue();
        if (initialValue !== this.inputElement.value) {
            event?.stopPropagation();
        }
        this.formControl.patchValue(value);
        this.inputElement.value = formattedValue;
        this.cd.detectChanges();
    }

    formatValue(): { initialValue: string; value: string; formattedValue: string } {
        const initialValue: string = this.inputElement.value;
        const value: string = initialValue
            .split(/[.,]/)[0]
            .replace(/[^0-9]*/g, "")
            .replace(/^0+(?!\.|$)/, "");
        const formattedValue: string = value ? formatNumber(Number(value), "se") : value;
        return {
            initialValue,
            value,
            formattedValue,
        };
    }
}

@NgModule({
    declarations: [DigitOnlyDirective],
    exports: [DigitOnlyDirective],
})
export class DigitOnlyModule {}
