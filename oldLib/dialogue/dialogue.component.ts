import { Component, Input, ViewEncapsulation, OnInit, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: "ac-dialogue",
    styleUrls: ["./dialogue.component.scss"],
    templateUrl: "./dialogue.component.html",
    encapsulation: ViewEncapsulation.None
})
export class DialogueComponent implements OnInit, OnChanges {
    @Input() toggle: boolean;
    @Input() header?: string;
    @Input() desc?: string;
    @Input() primaryBtn?: string;
    @Input() secondaryBtn?: string;
    @Input() primaryAction?: () => void;
    @Input() secondaryAction?: () => void;
    @Input() className?: string;

    open: boolean;
    close: boolean;

    ngOnInit(): void {
        if (this.toggle) {
            this.open = true;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.toggle) {
            if (changes.toggle.previousValue !== undefined) {
                if (changes.toggle.currentValue !== changes.toggle.previousValue) {
                    this.open = this.toggle;
                    this.close = !this.toggle;
                }
            }
        }
    }

    stopProp(e: any) {
        e.stopPropagation();
    }
}
