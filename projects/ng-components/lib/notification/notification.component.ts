import { OnChanges, Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, SimpleChanges, OnDestroy } from "@angular/core";

export type NotificationStyle = "slide-in" | "bar";
export type NotificationPosition = "bottom-left" | "bottom-right" | "top-left" | "top-right" | "top" | "bottom";
export type NotificationTheme = "purple" | "primary" | "danger" | "success" | "warning" | "inverted";

export interface NotificationAction {
    text: string;
    action: () => void;
}

/** An alert which pops up on the page to inform the user of an event which occured and optionally provide actions to perform. */
@Component({
    selector: "sebng-notification",
    templateUrl: "./notification.component.html",
    styleUrls: ["./notification.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class NotificationComponent implements OnChanges, OnInit, OnDestroy {
    @Input() className?: string;
    @Input() dismissable?: boolean;
    @Input() dismissTimeout?: number;
    @Input() message?: string;
    @Output() onClick?: EventEmitter<MouseEvent> = new EventEmitter();

    @Output() onDismiss?: EventEmitter<void> = new EventEmitter();

    @Input() persist?: boolean;
    @Input() position?: NotificationPosition;
    @Input() style?: NotificationStyle;
    @Input() theme?: NotificationTheme;
    @Input() title?: string;
    @Input() toggle: boolean;
    @Input() actions?: Array<NotificationAction>;

    public notificationClassNames: string;
    public showNotificationBody: boolean = false;
    public showNotificationTitle: boolean = false;
    private timerRef: number = null;
    private defaultTimeout: number = 5000;

    // helper functions

    /**
     * Get the style class based on the theme passed through the props
     * @param {string} style The style passed through the props
     */
    private getStyleClass(): void {
        let styleClass: string = "style-";
        if (this.style && ["slide-in", "bar"].some((s: string) => s === this.style)) {
            styleClass += this.style;
        } else {
            styleClass += "slide-in";
        }

        this.notificationClassNames += " " + styleClass;

        this.showNotificationTitle = this.title && styleClass === "style-slide-in";
        this.showNotificationBody = styleClass === "style-slide-in" && this.actions && this.actions.length && this.actions.length < 3;
    }

    /**
     * Get the theme class based on the theme passed though the props
     */
    private getThemeClass(): void {
        let themeClass: string = "theme-";
        if (
            this.theme &&
            ["purple", "primary", "danger", "success", "warning", "inverted"].some((t: NotificationTheme) => t === this.theme)
        ) {
            themeClass += this.theme;
        } else {
            themeClass += "purple";
        }
        this.notificationClassNames += " " + themeClass;
    }

    /**
     * Get the position class based on the position and style passed through the props
     */
    private getPositionClass(): void {
        let positionClass: string;
        const position: string = this.position;
        if (this.style && ["slide-in", "bar"].some((s: string) => s === this.style)) {
            switch (this.style) {
                case "slide-in":
                    if (position && ["bottom-left", "bottom-right", "top-left", "top-right"].some((p: string) => p === position)) {
                        positionClass = position;
                    } else {
                        positionClass = "bottom-left";
                    }
                    break;
                case "bar":
                    if (position && ["top", "bottom"].some((p: string) => p === position)) {
                        positionClass = position;
                    } else {
                        positionClass = "top";
                    }
                    break;
            }
        } else {
            // Should default back to `slide-in`
            if (position && ["bottom-left", "bottom-right", "top-left", "top-right"].some((p: string) => p === position)) {
                positionClass = position;
            } else {
                positionClass = "bottom-left";
            }
        }

        this.notificationClassNames += " " + positionClass;
    }

    /** Start the timer to dismiss the notification */
    private startTimer(): void {
        this.clearTimer();
        this.timerRef = window.setTimeout(() => {
            this.dismiss();
        }, this.dismissTimeout || this.defaultTimeout);
    }

    /** Dismiss the notification */
    public dismiss(): void {
        this.clearTimer();
        this.onDismiss && this.onDismiss.emit();
    }

    /** Clear the timer that dismisses the notification */
    private clearTimer(): void {
        if (this.timerRef) {
            clearTimeout(this.timerRef);
            this.timerRef = null;
        }
    }

    private setClassNames(): void {
        this.notificationClassNames = "custom-notification";
        this.getStyleClass();
        this.getThemeClass();
        this.getPositionClass();

        this.notificationClassNames += this.toggle ? " open" : "";
        this.notificationClassNames += this.className ? ` ${this.className}` : "";
    }

    // events

    handleClick(e: MouseEvent) {
        this.onClick.emit(e);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.toggle) {
            if (this.toggle && !this.persist) {
                this.startTimer();
            } else {
                this.clearTimer();
            }

            this.setClassNames();
        }

        if (changes.style || changes.position || changes.className || changes.actions || changes.theme) {
            this.setClassNames();
        }
    }

    ngOnInit() {
        this.setClassNames();
        if (this.toggle && !this.persist) {
            this.startTimer();
        }
    }

    ngOnDestroy(): void {
        this.clearTimer();
    }
}
