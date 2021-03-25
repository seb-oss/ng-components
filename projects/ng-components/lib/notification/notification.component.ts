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
    /** Element class name */
    @Input() className?: string;
    /** Property sets whether the notification is dismissable */
    @Input() dismissable?: boolean = true;
    /** Interval for the notification to be dismissed */
    @Input() dismissTimeout?: number;
    /** Persist notification until dismissed (default: false) */
    @Input() persist?: boolean = false;
    /** Notification position, "bottom-left" | "bottom-right" | "top-left" | "top-right" | "top" | "bottom" */
    @Input() position?: NotificationPosition;
    /** Notification style, "slide-in" | "bar" */
    @Input() style?: NotificationStyle;
    /** Notification theme, "purple" | "primary" | "danger" | "success" | "warning" | "inverted" */
    @Input() theme?: NotificationTheme;
    /** Notification title */
    @Input() title?: string;
    /** Notification content */
    @Input() message?: string;
    /** Property sets whether the notification is toggled */
    @Input() toggle: boolean;
    /** Display action buttons - max: 2 actions */
    @Input() actions?: Array<NotificationAction>;
    /** Callback when notification is clicked */
    @Output() notificationClick?: EventEmitter<MouseEvent> = new EventEmitter();
    /** Callback when notification is dismissed */
    @Output() dismiss?: EventEmitter<void> = new EventEmitter();

    public notificationClassNames: string;
    private timerRef: { current: any } = { current: null };
    private defaultTimeout: any = 5000;

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
    }

    /** Get the theme class based on the theme passed though the props */
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

    /** Get the position class based on the position and style passed through the props */
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
    startTimer(): void {
        this.clearTimer();
        this.timerRef.current = setTimeout(() => {
            this.dismissNotification();
        }, this.dismissTimeout || this.defaultTimeout);
    }

    /** Dismiss the notification */
    dismissNotification(): void {
        this.clearTimer();
        this.dismiss.emit();
    }

    /** Clear the timer that dismisses the notification */
    clearTimer(): void {
        if (this.timerRef.current) {
            clearTimeout(this.timerRef.current);
            this.timerRef.current = null;
        }
    }

    setClassNames(): void {
        this.notificationClassNames = "custom-notification";
        this.getStyleClass();
        this.getThemeClass();
        this.getPositionClass();

        this.notificationClassNames += this.className ? ` ${this.className}` : "";
    }

    // events
    ngOnInit(): void {
        this.setClassNames();
        if (this.toggle && !this.persist) {
            this.startTimer();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
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

        if (changes.persist) {
            this.clearTimer();
        }
    }

    ngOnDestroy(): void {
        this.clearTimer();
    }
}
