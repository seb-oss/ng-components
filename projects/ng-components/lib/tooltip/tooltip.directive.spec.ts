import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Component, TemplateRef, ElementRef } from "@angular/core";
import { TooltipTrigger, TooltipTheme, TooltipModule } from ".";
import { OverlayContainer, OverlayModule } from "@angular/cdk/overlay";
import { Direction, Directionality } from "@angular/cdk/bidi";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Platform } from "@angular/cdk/platform";
import { FocusMonitor } from "@angular/cdk/a11y";
import { TooltipPosition } from "./tooltip.positions";

type TriggerTestCase = {
    trigger: TooltipTrigger;
    eventToShow: () => void;
    eventToHide: () => void;
};

@Component({
    selector: "test-sebng-tooltip-directive",
    template: `
        <div class="test-component" style="text-align: center">
            <abbr
                class="text-help"
                [sebng-tooltip]="content"
                [className]="className"
                [trigger]="trigger"
                [theme]="theme"
                [position]="position"
                >I contain a tooltip</abbr
            >
        </div>
        <div class="random-class">random</div>
    `,
})
class TooltipTestComponent {
    content: string | TemplateRef<any> = "";
    className: string = "";
    trigger: TooltipTrigger = "hover";
    position: TooltipPosition = "top";
    theme: TooltipTheme = "default";
}

describe("TooltipDirective", () => {
    let component: TooltipTestComponent;
    let fixture: ComponentFixture<TooltipTestComponent>;

    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let dir: { value: Direction };
    let platform: { IOS: boolean; isBrowser: boolean; ANDROID: boolean };
    let focusMonitor: FocusMonitor;

    beforeEach(async(() => {
        // Set the default Platform override that can be updated before component creation.
        platform = { IOS: false, isBrowser: true, ANDROID: false };

        TestBed.configureTestingModule({
            imports: [TooltipModule, OverlayModule, NoopAnimationsModule],
            declarations: [TooltipTestComponent],
            providers: [
                { provide: Platform, useFactory: () => platform },
                {
                    provide: Directionality,
                    useFactory: () => {
                        return (dir = { value: "ltr" });
                    },
                },
            ],
        });

        TestBed.compileComponents();

        inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
            focusMonitor = fm;
        })();
    }));

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        // Since we're resetting the testing module in some of the tests,
        // we can potentially have multiple overlay containers.
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));

    describe("tooltip", () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(TooltipTestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it("should create", () => {
            expect(component).toBeTruthy();
        });

        it("Should render className", async () => {
            const customClassName: string = "myClassName";
            component.className = customClassName;
            fixture.detectChanges();
            fixture.debugElement.query(By.css(".text-help")).nativeElement.dispatchEvent(new MouseEvent("mouseenter"));
            fixture.detectChanges();
            await fixture.whenStable();
            const overlayElement: HTMLElement = overlayContainer.getContainerElement();
            expect(overlayElement.querySelector(".custom-tooltip-content")).not.toBeNull();
            expect(overlayElement.querySelector(`.${customClassName}`)).not.toBeNull();
        });

        describe("Should display based on position", () => {
            const positions: Array<TooltipPosition> = [
                "top",
                "bottom",
                "left",
                "right",
                "top-right",
                "top-left",
                "bottom-right",
                "bottom-left",
                "left-top",
                "left-bottom",
                "right-top",
                "right-bottom",
            ];
            positions.map((position: TooltipPosition) => {
                it(`render at ${position}`, async () => {
                    component.position = position;
                    fixture.detectChanges();
                    fixture.debugElement.query(By.css(".text-help")).nativeElement.dispatchEvent(new MouseEvent("mouseenter"));
                    fixture.detectChanges();
                    await fixture.whenStable();
                    const overlayElement: HTMLElement = overlayContainer.getContainerElement();
                    expect(overlayElement.querySelector(".custom-tooltip-content")).not.toBeNull();
                    expect(overlayElement.querySelector(`.bs-tooltip-${position}`)).not.toBeNull();
                });
            });
        });

        describe("Should display based on theme", () => {
            const themes: Array<TooltipTheme> = ["default", "light", "primary", "warning", "success", "danger", "purple"];
            themes.map((theme: TooltipTheme) => {
                it(`render at ${theme}`, async () => {
                    component.theme = theme;
                    fixture.detectChanges();
                    fixture.debugElement.query(By.css(".text-help")).nativeElement.dispatchEvent(new MouseEvent("mouseenter"));
                    fixture.detectChanges();
                    await fixture.whenStable();
                    const overlayElement: HTMLElement = overlayContainer.getContainerElement();
                    expect(overlayElement.querySelector(".custom-tooltip-content")).not.toBeNull();
                    expect(overlayElement.querySelector(`.${theme}`)).not.toBeNull();
                });
            });
        });

        describe("Should toggle based on trigger method:", () => {
            const triggerTestCases: Array<TriggerTestCase> = [
                {
                    trigger: "hover",
                    eventToShow: () => {
                        fixture.debugElement.query(By.css(".text-help")).nativeElement.dispatchEvent(new MouseEvent("mouseenter"));
                    },
                    eventToHide: () => {
                        fixture.debugElement.query(By.css(".text-help")).nativeElement.dispatchEvent(new MouseEvent("mouseout"));
                    },
                },
                {
                    trigger: "click",
                    eventToShow: () => {
                        fixture.debugElement.query(By.css(".text-help")).nativeElement.dispatchEvent(new MouseEvent("click"));
                    },
                    eventToHide: () => {
                        fixture.debugElement.query(By.css(".text-help")).nativeElement.dispatchEvent(new FocusEvent("blur"));
                    },
                },
                {
                    trigger: "focus",
                    eventToShow: () => {
                        fixture.debugElement.query(By.css(".text-help")).nativeElement.dispatchEvent(new FocusEvent("focus"));
                    },
                    eventToHide: () => {
                        fixture.debugElement.query(By.css(".text-help")).nativeElement.dispatchEvent(new FocusEvent("blur"));
                    },
                },
            ];
            triggerTestCases.map((triggerTestCase: TriggerTestCase) => {
                it(triggerTestCase.trigger, async () => {
                    component.trigger = triggerTestCase.trigger;
                    fixture.detectChanges();
                    triggerTestCase.eventToShow();
                    fixture.detectChanges();
                    await fixture.whenStable();
                    expect(overlayContainer.getContainerElement().querySelector(".custom-tooltip-content")).not.toBeNull();
                    triggerTestCase.eventToHide();
                    fixture.detectChanges();
                    await fixture.whenStable();
                    expect(overlayContainer.getContainerElement().querySelector(".custom-tooltip-content")).toBeNull();
                });
            });
        });
    });
});
