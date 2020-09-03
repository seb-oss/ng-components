import { Component, TemplateRef, ElementRef } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TooltipContentComponent, TooltipTheme } from "./tooltip-content.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TooltipPosition } from "../tooltip.positions";

@Component({
    selector: "test-sebng-tooltip-content",
    template: `
        <sebng-tooltip-content
            [className]="className"
            [content]="content"
            [tooltipReference]="tooltipReference"
            [position]="position"
            [theme]="theme"
        ></sebng-tooltip-content>
    `,
})
class TooltipContentTestComponent {
    content: string | TemplateRef<any> = "";
    tooltipReference: ElementRef<HTMLDivElement>;
    position: TooltipPosition = "top";
    theme: TooltipTheme = "default";
    className?: string = "";

    defocus() {}
}

describe("TooltipContentComponent", () => {
    let component: TooltipContentTestComponent;
    let fixture: ComponentFixture<TooltipContentTestComponent>;
    let onChange: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, BrowserAnimationsModule],
            declarations: [TooltipContentComponent, TooltipContentTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TooltipContentTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        onChange = spyOn(component, "defocus");
    });

    it("render and be defined", () => {
        expect(component).toBeTruthy();
    });

    it("Should pass custom class", () => {
        component.className = "myTooltipClass";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".myTooltipClass"))).toBeTruthy();
    });

    it("Should display as string", () => {
        const contentString: string = "newContent";
        component.content = contentString;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".tooltip-inner")).nativeElement.textContent).toContain(contentString);
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
            it(`render at ${position}`, () => {
                component.position = position;
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css(`.bs-tooltip-${position}`))).toBeTruthy();
            });
        });
    });

    describe("Should display based on theme", () => {
        const themes: Array<TooltipTheme> = ["default", "light", "primary", "warning", "success", "danger", "purple"];
        themes.map((theme: TooltipTheme) => {
            it(`render as ${theme}`, () => {
                component.theme = theme;
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css(`.${theme}`))).toBeTruthy();
            });
        });
    });
});
