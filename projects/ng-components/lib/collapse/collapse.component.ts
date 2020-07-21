import { Component, Input, ViewChild, ElementRef, EventEmitter, Output, OnChanges, SimpleChanges } from "@angular/core";

type DisplayType = "block" | "none";

/** A helper component for collapsing any content placed inside of it */
@Component({
    selector: "sebng-collapse",
    template: `
        <div
            #collapseRef
            [ngStyle]="{ display: this.display, height: this.height, opacity: this.opacity }"
            (transitionend)="transitionEnd.emit()"
            [ngClass]="class"
            class="custom-collapse"
        >
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ["./collapse.component.scss"],
})
export class CollapseComponent implements OnChanges {
    /** Collapse toggle */
    @Input() toggle?: boolean = true;
    /** Element class */
    @Input() class?: string;
    /** This method will be triggered after the transition has ended */
    @Output() transitionEnd: EventEmitter<void> = new EventEmitter();

    @ViewChild("collapseRef") collapseRef: ElementRef<HTMLDivElement>;

    display: string = "block";
    height: string = "auto";
    opacity: "0" | "1" = "1";

    ngOnChanges(changes: SimpleChanges): void {
        console.log("Changes");
        if (changes.toggle) {
            if (this.toggle) {
                this.uncollapse();
            } else {
                this.collapse();
            }
        }
    }

    collapse(): void {
        this.height = this.collapseRef.nativeElement.scrollHeight + "px";
        setTimeout(() => {
            this.height = 0 + "px";
            this.opacity = "0";
        }, 10);
    }

    uncollapse(): void {
        this.display = "block";
        setTimeout(() => {
            this.height = this.collapseRef.nativeElement.scrollHeight + "px";
            this.opacity = "1";
        }, 10);
    }

    afterTransition(e: TransitionEvent): void {
        if (e.propertyName === "height") {
            switch (true) {
                /** After expand, the height is set to auto to enable responsiveness */
                case this.toggle && this.height && this.height !== "auto":
                    this.height = "auto";
                    break;
                /** After collapse, the display is set to none to disable tab navigation inside the hidden collapse */
                case !this.height && !this.toggle:
                    this.display = "none";
                    break;
            }
        }
        this.transitionEnd.emit();
    }
}

/**
 * Collapsed:
 * - height: 0
 * - display: none
 * - opacitiy: 0
 *
 * Uncollapsed:
 * - height: auto
 * - display: block
 * - opacity: 1
 */
