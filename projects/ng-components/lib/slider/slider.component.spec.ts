import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { SliderTheme, RangeSliderLabel, SliderAppearance } from "./slider.component";
import { SliderModule } from "./slider.module";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

type ThumbLocationTestcase = {
    min: number;
    max: number;
    value: number;
    expected: string;
};

@Component({
    selector: "test-sebng-tabs",
    template: `
        <sebng-slider
            name="slider"
            [className]="className"
            [(ngModel)]="slider"
            [min]="min"
            [max]="max"
            [id]="id"
            [step]="step"
            [appearance]="appearance"
            [labels]="labels"
            [label]="label"
            [showTicks]="showTicks"
            [theme]="theme"
            [error]="error"
            [disabled]="disabled"
            [tooltipTheme]="tooltipTheme"
            [alternative]="alternative"
            (onChange)="onChange($event)"
            [alwaysShowTooltip]="alwaysShowTooltip"
            [tooltipValue]="tooltipValue"
        >
        </sebng-slider>
    `,
})
class SliderTestComponent {
    alternative?: boolean;
    appearance: SliderAppearance;
    alwaysShowTooltip?: boolean;
    className?: string;
    disabled?: boolean;
    error?: string;
    id?: string;
    label?: string;
    labels?: Array<RangeSliderLabel>;
    max?: number;
    min?: number;
    name: string;
    onChange(value: any) {}

    showTicks?: boolean;
    step?: number;
    theme?: SliderTheme;
    tooltipTheme?: SliderTheme;
    tooltipValue?: string;

    slider: number;
}

describe("SliderComponent", () => {
    let component: SliderTestComponent;
    let fixture: ComponentFixture<SliderTestComponent>;
    let onClick: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, SliderModule],
            declarations: [SliderTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderTestComponent);
        component = fixture.componentInstance;
        component.appearance = "normal";
        component.slider = 25;
        component.disabled = false;
        component.error = "";
        component.showTicks = false;
        component.alwaysShowTooltip = false;
        component.min = 0;
        component.max = 100;
        component.step = 1;
        component.labels = [];
        component.slider = 25;
        fixture.detectChanges();
    });

    it("Should render", () => {
        expect(component).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "mySliderClass";
        const id: string = "mySliderId";

        component.id = id;
        component.className = className;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`.${className}`))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(`#${id}`))).toBeTruthy();
    });

    it("Should render label", () => {
        const label: string = "Slider label";
        component.label = label;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`.custom-label`))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(`.custom-label`)).nativeElement.textContent).toEqual(label);
    });

    it("Should render error message", () => {
        const error: string = "Some error";
        component.error = error;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`.alert`))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(`.alert`)).nativeElement.textContent).toEqual(error);
    });

    it("Should render with default min and max if not passed", () => {
        expect(fixture.debugElement.query(By.css(`input`)).attributes.min).toEqual("0");
        expect(fixture.debugElement.query(By.css(`input`)).attributes.max).toEqual("100");

        component.min = 20;
        component.max = 60;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`input`)).attributes.min).toEqual("20");
        expect(fixture.debugElement.query(By.css(`input`)).attributes.max).toEqual("60");
    });

    it("Should render labels when passed", () => {
        component.labels = [
            { position: 0, text: "empty" },
            { position: 100, text: "full" },
        ];

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`.custom-slider-label`))).toBeTruthy();
    });

    it("Should always show tooltip when alwaysShowTooltip is set to true", () => {
        component.alwaysShowTooltip = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.custom-slider-preview`)).classes["always-show"]).toBeTrue();
    });

    it("Should show ticks when showTicks is set to true", () => {
        component.labels = [
            { position: 0, text: "empty" },
            { position: 100, text: "full" },
        ];
        component.showTicks = true;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".custom-slider-label")).classes["show-ticks"]).toBeTrue();
    });

    it("Should be able to pick a different theme", fakeAsync(() => {
        const theme: SliderTheme = "danger";
        component.theme = theme;
        component.tooltipTheme = "danger";

        fixture.detectChanges();
        tick(100);

        expect(fixture.debugElement.query(By.css(`.custom-slider-holder`)).classes.danger).toBeTrue(); // theme
        expect(fixture.debugElement.query(By.css(`.custom-slider-preview`)).classes.danger).toBeTrue(); // tooltipTheme
    }));

    it("Should be disabled when disabled prop is set to true", () => {
        component.disabled = true;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".custom-slider")).classes.disabled).toBeTrue();
    });

    it("Should enable transitions only when the steps less than 30 to increase preceptual performance", () => {
        component.min = 0;
        component.max = 100;
        component.step = 20;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.custom-slider-track`)).classes["with-transitions"]).toBeTrue();
    });
});
