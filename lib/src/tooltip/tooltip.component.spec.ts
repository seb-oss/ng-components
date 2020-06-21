import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";

import { TooltipComponent } from "./tooltip.component";
import { By } from "@angular/platform-browser";
import { Component, TemplateRef, ElementRef } from "@angular/core";
import { TooltipTrigger, TooltipPosition, TooltipTheme, TooltipModule } from ".";
import { OverlayContainer, OverlayModule } from "@angular/cdk/overlay";
import { Direction, Directionality } from "@angular/cdk/bidi";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Platform } from "@angular/cdk/platform";
import { FocusMonitor } from "@angular/cdk/a11y";

@Component({
    selector: "test-sebng-tooltip",
    template: `
        <sebng-tooltip
            [content]="content"
            [className]="className"
            (defocus)="defocus($event)"
            [trigger]="trigger"
            [theme]="theme"
            [position]="position"
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
    defocus(e: Event): void {}
}

describe("TooltipComponent", () => {
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

    describe("basic", () => {
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
    });
});
