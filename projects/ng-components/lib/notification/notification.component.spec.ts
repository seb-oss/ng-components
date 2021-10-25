import { EventEmitter } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync, discardPeriodicTasks } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NotificationComponent, NotificationAction, NotificationPosition, NotificationStyle } from "./notification.component";

describe("NotificationComponent", () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;
    let onDismiss: jasmine.Spy;
    let onClick: jasmine.Spy;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [NotificationComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;

        component.toggle = true;
        onDismiss = spyOn(component.dismiss, "emit");

        component.message = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
        component.actions = [
            { text: "Yes, I'm in", action: () => {} },
            { text: "Ignore", action: () => {} },
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
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".style-bar"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".top"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".theme-purple"))).toBeTruthy();
        });

        it("Should dismiss when the default timer is done", fakeAsync(() => {
            component.toggle = true;
            component.persist = false;
            component.dismissTimeout = 200;
            component.dismiss = new EventEmitter();
            component.dismiss.subscribe(() => {
                component.toggle = false;
            });

            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".open"))).toBeTruthy();

            tick(300);

            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".open"))).toBeFalsy();
        }));

        it("Should render with defaults if style or position props passed is not supported", () => {
            component.style = "bingo" as NotificationStyle;
            component.position = "top-right";
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".style-slide-in.top-right"))).toBeTruthy();

            component.style = "slide-in" as NotificationStyle;
            component.position = "top-left";
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".style-slide-in.top-left"))).toBeTruthy();

            component.position = "bingo" as NotificationPosition;
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".bottom-left"))).toBeTruthy();
        });
    });

    it("Should render different variations of style, position and theme", () => {
        component.style = "bar";
        component.theme = "primary";
        component.position = "bottom";
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".style-bar"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".theme-primary"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".bottom"))).toBeTruthy();
    });

    it("Should pass custom class", () => {
        component.className = "myNotification";
        component.ngOnInit();
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
        component.notificationClick = new EventEmitter<MouseEvent>();
        component.notificationClick.subscribe(() => {});
        onClick = spyOn(component.notificationClick, "emit");
        fixture.detectChanges();
        fixture.debugElement.query(By.css(".content-wrapper")).nativeElement.dispatchEvent(new Event("click"));

        expect(fixture.debugElement.query(By.css(".content-wrapper")).classes.clickable).toBeTrue();

        expect(onClick).toHaveBeenCalled();
    });

    it("Should call mouseenter when mouse enters notification", () => {
        spyOn(component, "mouseEnter").and.callThrough();
        spyOn(component, "pauseTimer").and.callThrough();
        const mouseEnterEvent = new Event("mouseenter");
        const notification = fixture.debugElement.query(By.css(".custom-notification"));
        notification.nativeElement.dispatchEvent(mouseEnterEvent);
        expect(component.mouseEnter).toHaveBeenCalled();
        expect(component.pauseTimer).toHaveBeenCalled();
    });

    it("Should call mouseleave when mouse leaves notification", () => {
        spyOn(component, "mouseLeave").and.callThrough();
        spyOn(component, "restartTimer").and.callThrough();
        const mouseEnterEvent = new Event("mouseenter");
        const mouseLeaveEvent = new Event("mouseleave");
        const notification = fixture.debugElement.query(By.css(".custom-notification"));
        notification.nativeElement.dispatchEvent(mouseEnterEvent);
        notification.nativeElement.dispatchEvent(mouseLeaveEvent);
        expect(component.mouseLeave).toHaveBeenCalled();
        expect(component.restartTimer).toHaveBeenCalled();
    });

    it("Should reset timer when the default timer is done", fakeAsync(() => {
        spyOn(component, "restartTimer").and.callThrough();
        spyOn(component, "dismissNotification").and.callThrough();
        const mouseEnterEvent = new Event("mouseenter");
        const mouseLeaveEvent = new Event("mouseleave");
        component.toggle = true;
        component.persist = false;
        component.dismissTimeout = 1000;

        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".open"))).toBeTruthy();

        tick(300);
        const notification = fixture.debugElement.query(By.css(".custom-notification"));
        notification.nativeElement.dispatchEvent(mouseEnterEvent);
        expect(component.progressValue).toEqual(400);
        expect(component.progressValuePercentage).toEqual(40);

        tick(300);
        notification.nativeElement.dispatchEvent(mouseLeaveEvent);
        expect(component.progressValue).toEqual(400);
        expect(component.restartTimer).toHaveBeenCalled();

        tick(400);
        console.log("===>", component.progressValue);
        expect(component.progressValue).toEqual(900);
        expect(component.progressValuePercentage).toEqual(90);
        tick(1000);
        expect(component.progressValuePercentage).toEqual(0);
        expect(component.dismissNotification).toHaveBeenCalled();

        discardPeriodicTasks();
    }));

    describe("Should render actions when passed", () => {
        it("Should render one action taking the whole width", () => {
            component.actions = [
                { text: "action1", action: () => {} },
                { text: "action2", action: () => {} },
            ];
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".action-wrapper")).length).not.toBe(0);
            expect(fixture.debugElement.query(By.css(".actions-wrapper")).classes.partitioned).toBeFalsy();
        });

        it("Should render two actions with equal width", () => {
            component.style = "slide-in";
            component.actions = [
                { text: "action1", action: () => {} },
                { text: "action2", action: () => {} },
            ];
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".action-wrapper")).length).not.toBe(0);
            expect(fixture.debugElement.query(By.css(".actions-wrapper")).classes.partitioned).toBeTrue();
        });

        it("Should render actions with correct label and action callback should be called when clicked", () => {
            const actions: Array<NotificationAction> = [
                { text: "action1", action: () => {} },
                { text: "action2", action: () => {} },
            ];
            component.actions = actions;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".action-wrapper"))[0].query(By.css("button")).nativeElement.textContent).toContain(
                "action1"
            );
            expect(fixture.debugElement.queryAll(By.css(".action-wrapper"))[1].query(By.css("button")).nativeElement.textContent).toContain(
                "action2"
            );
        });
    });
});
