import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
    NotificationComponent,
    NotificationAction,
    NotificationPosition,
    NotificationTheme,
    NotificationStyle,
} from "./notification.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "test-sebng-notification",
    template: `
        <sebng-notification
            [className]="className"
            [dismissable]="dismissable"
            [dismissTimeout]="dismissTimeout"
            [message]="message"
            (onClick)="onClick()"
            (onDismiss)="onDismiss($event)"
            [persist]="persist"
            [position]="position"
            [style]="style"
            [theme]="theme"
            [title]="title"
            [toggle]="toggle"
            [actions]="actions"
        >
            <div class="testing">test</div></sebng-notification
        >
    `,
})
class NotificationTestComponent {
    className?: string;
    dismissable?: boolean;
    dismissTimeout?: number;
    message?: string;
    onClick() {}

    onDismiss() {}
    persist?: boolean;
    position?: NotificationPosition;
    style?: NotificationStyle;
    theme?: NotificationTheme;
    title?: string;
    toggle: boolean;
    actions?: Array<NotificationAction>;
}

describe("NotificationComponent", () => {
    let component: NotificationTestComponent;
    let fixture: ComponentFixture<NotificationTestComponent>;
    let onDismiss: jasmine.Spy;
    let onClick: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [NotificationComponent, NotificationTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationTestComponent);
        component = fixture.componentInstance;

        component.toggle = true;
        onDismiss = spyOn(component, "onDismiss");
        onClick = spyOn(component, "onClick");
        component.message = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
        component.actions = [
            { text: "Yes, I'm in", action: () => this.onToggle2(false) },
            { text: "Ignore", action: () => this.onToggle2(false) },
        ];
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("Should render with defaults", () => {
        it("slide-in style should render with bottom-left position and purple theme", () => {
            expect(fixture.debugElement.query(By.css(".style-slide-in"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".bottom-left"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".theme-purple"))).toBeTruthy();
        });

        it("bar style should render with top position and purple theme", () => {
            component.style = "bar";
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".style-bar"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".top"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".theme-purple"))).toBeTruthy();
        });

        it("Should dismiss when the default timer is done", async () => {
            component.toggle = true;
            component.dismissTimeout = 500;
            component.onDismiss = () => (component.toggle = false);

            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".open"))).toBeTruthy();
            await fixture.whenStable();
            await setTimeout(() => {
                expect(fixture.debugElement.query(By.css(".open"))).toBeTruthy();
            }, 600);
        });

        it("Should render with defaults if style or position props passed is not supported", () => {
            component.style = "bingo" as NotificationStyle;
            component.position = "top-right";
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".style-slide-in"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".top-right"))).toBeTruthy();
            component.style = "slide-in" as NotificationStyle;
            component.position = "top-left";
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".style-slide-in"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".top-left"))).toBeTruthy();

            component.position = "bingo" as NotificationPosition;
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".bottom-left"))).toBeTruthy();
        });
    });

    it("Should render different variations of style, position and theme", () => {
        component.style = "bar";
        component.theme = "primary";
        component.position = "bottom";

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".style-bar"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".theme-primary"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".bottom"))).toBeTruthy();
    });

    it("Should pass custom class", () => {
        component.className = "myNotification";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".myNotification"))).toBeTruthy();
    });

    it("Should render title and message", () => {
        component.title = "title";
        component.style = "style-slide-in" as NotificationStyle;
        component.message = "message";
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css(".notification-title")).length).not.toBe(0);
        expect(fixture.debugElement.query(By.css(".notification-title")).nativeElement.textContent.trim()).toEqual("title");
        expect(fixture.debugElement.queryAll(By.css(".notification-message")).length).not.toBe(0);
        expect(fixture.debugElement.query(By.css(".notification-message")).nativeElement.textContent.trim()).toEqual("message");
    });

    it("Should allow dismissing with close button", () => {
        component.dismissable = true;
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css(".dismiss-btn")).length).not.toBe(0);

        fixture.debugElement.query(By.css(".dismiss-btn")).nativeElement.dispatchEvent(new Event("click"));
        expect(onDismiss).toHaveBeenCalled();
    });

    it("Should call onClick when notification is clicked", () => {
        fixture.debugElement.query(By.css(".content-wrapper")).nativeElement.dispatchEvent(new Event("click"));

        expect(fixture.debugElement.query(By.css(".content-wrapper")).classes.clickable).toBeTrue();

        expect(onClick).toHaveBeenCalled();
    });

    it("Should render child element when passed", () => {
        console.log("The element is neither title nor ", fixture.debugElement.query(By.css(".content-wrapper")).nativeElement);
        expect(fixture.debugElement.queryAll(By.css(".testing")).length).not.toBe(0);
    });
});
