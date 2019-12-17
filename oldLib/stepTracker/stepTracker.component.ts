import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ac-step-tracker",
    templateUrl: "./stepTracker.component.html",
    styleUrls: ["./stepTracker.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class StepTrackerComponent implements OnInit {
    @Input() step: number;
    @Input() list?: Array<string>;
    @Input() clickAction?: (index: number) => void;
    @Input() className?: string = "";
    @Input() labelPosition?: string;
    @Input() useNumbers?: boolean;
    @Input() orientation?: string;

    topLabel: boolean;
    bottomLabel: boolean;
    rightLabel: boolean;
    leftLabel: boolean;

    checkIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z" /></svg>`;

    ngOnInit() {
        this.setupTextAlignment();
    }

    setupTextAlignment() {
        if (["horizontal", "vertical"].indexOf(this.orientation) === -1) {
            this.orientation = "horizontal";
        }
        if (this.orientation === "horizontal") {
            if (["top", "bottom"].indexOf(this.labelPosition) === -1) {
                this.labelPosition = "bottom";
            }
            if (this.labelPosition === "top") {
                this.topLabel = true;
                this.bottomLabel = false;
                this.rightLabel = false;
                this.leftLabel = false;
            }
            if (this.labelPosition === "bottom") {
                this.topLabel = false;
                this.bottomLabel = true;
                this.rightLabel = false;
                this.leftLabel = false;
            }
        }
        if (this.orientation === "vertical") {
            if (["left", "right"].indexOf(this.labelPosition) === -1) {
                this.labelPosition = "right";
            }
            if (this.labelPosition === "left") {
                this.topLabel = false;
                this.bottomLabel = false;
                this.rightLabel = false;
                this.leftLabel = true;
            }
            if (this.labelPosition === "right") {
                this.topLabel = false;
                this.bottomLabel = false;
                this.rightLabel = true;
                this.leftLabel = false;
            }
        }
    }

    getProgress(pos: number): string {
        return (100 / (this.list.length - 1)) * pos + "%";
    }
}
