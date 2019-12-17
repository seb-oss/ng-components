
import { NotificationComponent, NotificationAction } from "./notification.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SafeHtmlPipe } from "./notification.pipe";

describe("Component: NotificationComponent", () => {
    let fixture: ComponentFixture<NotificationComponent>;
    let component: NotificationComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [NotificationComponent, SafeHtmlPipe],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(NotificationComponent);
            component = fixture.componentInstance;
        });
    }));

    it("should render and receive the correct className ", async(() => {
        component.className = "notification-component";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".notification-component"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should display title only when title and displayStyle parameters are provided", async(() => {
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".notification-title"))).toBeNull();

        component.displayStyle = "slide-in";
        component.title = "my notification";
        fixture.detectChanges();
        const notificationTitle = fixture.debugElement.query(By.css(".notification-title"));

        expect(notificationTitle).not.toBeNull();
        expect(notificationTitle.nativeElement.innerHTML).toEqual("my notification");
    }));

    it("notificationClicked should return false when clickAction is not provided", async(() => {
        const result = component.notificationClicked();

        expect(result).toEqual(false);
    }));

    it("should fire notificationClicked event when clicked", async(() => {
        component.clickAction = () => { };

        fixture.detectChanges();
        const onContentWrapperClickMock = spyOn(component, "notificationClicked").and.callThrough();
        const contentWrapper: DebugElement = fixture.debugElement.query(By.css(".content-wrapper"));
        contentWrapper.triggerEventHandler("click", null);

        fixture.whenStable().then(() => {
            expect(onContentWrapperClickMock).toHaveBeenCalledTimes(1);
            expect(onContentWrapperClickMock).toBeTruthy();
        });

    }));

    it("should support action notification when needed ", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".actions-wrapper"))).toBeNull();

        component.actions = [
            {
                text: "Continue!",
                action: () => true
            }
        ];
        component.displayStyle = "slide-in";

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".actions-wrapper"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(".notification-action"))).not.toBeNull();

        const onActionButtonClickMock = spyOn(component.actions[0], "action").and.callThrough();

        const btnAction = fixture.debugElement.query(By.css(".notification-action"));

        btnAction.triggerEventHandler("click", null);

        fixture.whenStable().then(() => {
            expect(onActionButtonClickMock).toHaveBeenCalledTimes(1);
        });

        expect(fixture.debugElement.query(By.css(".partitioned"))).toBeNull();

        component.actions[1] = {
            text: "close!",
            action: () => true
        };

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".partitioned"))).not.toBeNull();

    }));

    it("should support and render dismiss or close icon when needed", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".dismiss-btn"))).toBeNull();
        component.dismissable = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".dismiss-btn"))).not.toBeNull();
    }));

    it("should call dismiss function on dismiss icon clicked", async(() => {
        component.dismissable = true;
        component.onDismiss = () => true;
        fixture.detectChanges();

        const onDismissCalledMock = spyOn(component, "onDismiss").and.callThrough();
        const onDismissClickedMock = spyOn(component, "dismiss").and.callThrough();

        const dismissIcon = fixture.debugElement.query(By.css(".dismiss-btn"));

        dismissIcon.triggerEventHandler("click", null);

        fixture.whenStable().then(() => {
            expect(onDismissClickedMock).toHaveBeenCalled();
            expect(onDismissCalledMock).toHaveBeenCalledTimes(1);
            expect(onDismissClickedMock).toBeTruthy();
        });
    }));

    it("should call clickAction event when notificationClicked and clickAction properties are provided", async(() => {
        component.clickAction = () => true;
        fixture.detectChanges();

        const onClickActionCalledMock = spyOn(component, "clickAction").and.callThrough();
        const contentWrapper: DebugElement = fixture.debugElement.query(By.css(".content-wrapper"));

        contentWrapper.triggerEventHandler("click", null);
        fixture.whenStable().then(() => {
            expect(onClickActionCalledMock).toHaveBeenCalledTimes(1);
        });

    }));

    it("dismiss function should execute onDismiss function when onDismiss is provided , return false otherwise", async(() => {
        fixture.detectChanges();

        component.onDismiss = undefined;

        let result = component.dismiss();

        expect(result).toEqual(false);

        component.onDismiss = () => true;
        const onDismissMock = spyOn(component, "onDismiss");
        result = component.dismiss();

        fixture.whenStable().then(() => {
            expect(onDismissMock).toHaveBeenCalled();
            expect(result).toEqual(true);
        });
    }));

    it("clearTimer function should return true when timer is provided , false otherwise", async(() => {
        fixture.detectChanges();

        let result = component.clearTimer();

        expect(result).toEqual(false);

        component.timer = 500;

        result = component.clearTimer();

        expect(result).toEqual(true);

    }));

    it("ngOnChanges function should start and stop timer when toggle is true or false", async(() => {

        component.timer = 500;

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            component.ngOnChanges({
                toggle: new SimpleChange(false, true, false)
            });
            expect(component.timer).toEqual(null);

            /**
             * When toggle is true and persist is false
             *
             */
            component.toggle = true;
            component.persist = false;
            component.dismissTimeout = 1000;

            const startTimerMock = spyOn(component, "startTimer").and.callThrough();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.ngOnChanges({
                    toggle: new SimpleChange(false, true, false)
                });

                expect(startTimerMock).toHaveBeenCalled();
                expect(component.timer).toBeTruthy();
            });

        });
    }));

    it("ngOnInit function should set notification position", async(() => {
        component.position = "top";
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.ngOnInit();
            expect(component.position).toEqual("top");

            component.position = undefined;
            component.displayStyle = "slide-in";

            component.ngOnInit();

            expect(component.position).toEqual("bottom-left");

            component.position = undefined;
            component.displayStyle = "bar";

            component.ngOnInit();
            expect(component.position).toEqual("top");

        });
    }));
});
