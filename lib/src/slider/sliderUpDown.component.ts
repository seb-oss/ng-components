import { OnChanges, SimpleChanges, Component, Input, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

@Component({
    selector: "slider-up-down",
    template: `<div #sliderUpDownRef class="expand" [ngStyle]="height | sliderErrorStyle | async">
        <ng-content></ng-content>
    </div>`,
    encapsulation: ViewEncapsulation.None,
})
export class SliderUpDownComponent implements OnChanges, AfterViewInit {
    @Input() triggerValue: any;
    public height: number = 0;

    @ViewChild("sliderUpDownRef") sliderUpDownRef: ElementRef<HTMLDivElement>;

    computeChildHeight(): void {
        const children: HTMLCollection = this.sliderUpDownRef?.nativeElement?.children;
        let calculatedHeight: number = 0;
        for (let i = 0; i < children?.length; i++) {
            calculatedHeight += children.item(i).scrollHeight;
        }
        this.height = calculatedHeight;
    }

    ngAfterViewInit() {
        this.computeChildHeight();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.triggerValue) {
            this.computeChildHeight();
        }
    }
}
