import { ComponentFixture, TestBed, inject, waitForAsync } from "@angular/core/testing";

import { TooltipComponent } from "./tooltip.component";
import { By } from "@angular/platform-browser";
import { Component, TemplateRef, ElementRef, ViewChild } from "@angular/core";
import { TooltipTrigger, TooltipTheme, TooltipModule } from ".";
import { OverlayContainer, OverlayModule } from "@angular/cdk/overlay";
import { Direction, Directionality } from "@angular/cdk/bidi";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Platform } from "@angular/cdk/platform";
import { FocusMonitor } from "@angular/cdk/a11y";
import { TooltipPosition } from "./tooltip.positions";

@Component({
    selector: "test-sebng-tooltip",
    template: `
        <sebng-tooltip #tooltip [content]="content" [className]="className" [trigger]="trigger" [theme]="theme" [position]="position"
            >Test</sebng-tooltip
        >
    `,
})
class TooltipTestComponent {
    content: string | TemplateRef<any> = "";
    textReference: string = "";
    className: string = "";
    tooltipReference: ElementRef<HTMLDivElement>;
    trigger: TooltipTrigger = "hover";
    position: TooltipPosition = "top";
    theme: TooltipTheme = "default";
    @ViewChild("tooltip") tooltipRef: TooltipComponent;
}

describe("TooltipComponent", () => {
    let component: TooltipTestComponent;
    let fixture: ComponentFixture<TooltipTestComponent>;

    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let dir: { value: Direction };
    let platform: { IOS: boolean; isBrowser: boolean; ANDROID: boolean };
    let focusMonitor: FocusMonitor;

    beforeEach(
        waitForAsync(() => {
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
        })
    );

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

        it("Should render id and className", async () => {
            const customClassName: string = "myClassName";
            component.className = customClassName;
            fixture.detectChanges();
            fixture.debugElement.query(By.css(".custom-tooltip")).nativeElement.dispatchEvent(new MouseEvent("mouseenter"));
            fixture.detectChanges();
            await fixture.whenStable();
            expect(overlayContainer.getContainerElement().querySelector(".custom-tooltip-content")).not.toBeNull();
            expect(overlayContainer.getContainerElement().querySelector(`.${customClassName}`)).not.toBeNull();
        });

        it("should show tooltip if show function is called called", () => {
            component.tooltipRef.show();
            fixture.detectChanges();
            expect(overlayContainer.getContainerElement().querySelector(".custom-tooltip-content")).not.toBeNull();
        });

        it("should hide tooltip if show function is called called", () => {
            fixture.debugElement.query(By.css(".custom-tooltip")).nativeElement.dispatchEvent(new MouseEvent("mouseenter"));
            fixture.detectChanges();
            component.tooltipRef.hide();
            fixture.detectChanges();
            expect(overlayContainer.getContainerElement().querySelector(".custom-tooltip-content")).toBeNull();
        });
    });
});
