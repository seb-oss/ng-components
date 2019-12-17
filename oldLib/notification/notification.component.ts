import { Component, Input, ViewEncapsulation, OnInit, OnChanges, SimpleChanges } from "@angular/core";

export interface NotificationAction {
    text: string;
    action: () => void;
}

@Component({
    selector: "ac-notification",
    templateUrl: "notification.component.html",
    styleUrls: ["./notification.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit, OnChanges {
    @Input() toggle: boolean;
    @Input() displayStyle?: string = "slide-in";
    @Input() position?: string;
    @Input() title?: string;
    @Input() message?: string;
    @Input() dismissable?: boolean;
    @Input() dismissTimeout?: number = 5000;
    @Input() actions?: Array<NotificationAction>;
    @Input() persist?: boolean;
    @Input() theme?: string;
    @Input() clickAction?: () => void;
    @Input() onDismiss: () => void;
    @Input() className?: string;

    timer: number;
    timeIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z" /></svg>`;

    ngOnInit() {
        if (this.position) {
            this.position = this.position;
        } else {
            switch (this.displayStyle) {
                case "slide-in": this.position = "bottom-left"; break;
                case "bar": this.position = "top"; break;
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // If Changes happended to the toggle
        if (changes.toggle) {
            if (changes.toggle.currentValue !== changes.toggle.previousValue) {
                if (this.toggle && !this.persist) {
                    this.startTimer();
                } else {
                    this.clearTimer();
                }
            }
        }
    }

    /**
     * Dismisses the notification
     * @returns {boolean} True if onDismiss method is fired
     */
    dismiss(): boolean {
        this.clearTimer();
        if (this.onDismiss) {
            this.onDismiss();
            return true;
        } else {
            return false;
        }
    }

    /** Starts the clear timer */
    startTimer(): void {
        this.timer = window.setTimeout(() => {
            this.dismiss();
        }, this.dismissTimeout);
    }

    /**
     * Clears the dismiss timer
     * @returns {boolean} True if timer is found and cleared
     */
    clearTimer(): boolean {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Notification click handler
     * @returns {boolean} True if onClick method is fired
     */
    notificationClicked(): boolean {
        if (this.clickAction) {
            this.clickAction();
            return true;
        } else {
            return false;
        }
    }
}
