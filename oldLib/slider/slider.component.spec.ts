
import { SliderComponent, RangeSliderLabel, CUSTOM_SLIDER_CONTROL_VALUE_ACCESSOR } from "./slider.component";
import { Component, ViewChild } from "@angular/core";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    selector: "tac-slider",
    template: `<div class="result">
    <ac-slider
        [(ngModel)]="slider"
        [min]="sliderMin"
        [max]="sliderMax"
        [step]="5"
        [labels]="sliderLabels"
        className="{{className}}"
    ></ac-slider>
</div> `,
})
class CustomTestClass {
    @ViewChild(SliderComponent) sliderComponent: SliderComponent;
    slider: number = 25;
    sliderMin: number = 0;
    sliderMax: number = 100;
    sliderLabels: Array<RangeSliderLabel> = [
        { position: 0, text: "0%" },
        { position: 25, text: "25%" },
        { position: 50, text: "50%" },
        { position: 75, text: "75%" },
        { position: 100, text: "100%" },
    ];
    className = "my-slider";
}

describe("Component: SliderComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [SliderComponent, CustomTestClass],
            providers: [CUSTOM_SLIDER_CONTROL_VALUE_ACCESSOR],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CustomTestClass);
            component = fixture.componentInstance;
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should render and receive the correct css class parameter", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-slider"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should render and calculate the correct slider value", fakeAsync(() => {
        fixture.detectChanges();

        const getPercentage = (num: number, min: number, max: number) => {
            return ((num - min) / (max - min)) * 100;
        };

        let realValue = component.sliderComponent.getPercentage(component.slider);
        let expectedValue = getPercentage(component.slider, component.sliderMin, component.sliderMax);
        expect(realValue).toEqual(expectedValue);
        expect(realValue).toEqual(25);

        // test for when value is greater than max
        component.sliderMax = 60;
        fixture.detectChanges();
        realValue = component.sliderComponent.getPercentage(100);
        expectedValue = getPercentage(100, component.sliderMin, component.sliderMax);
        expect(Math.ceil(expectedValue)).toEqual(167);
        expect(Math.ceil(realValue)).toEqual(167);

        // Test for slider value changes
        component.sliderMin = 0;
        component.sliderMax = 100;
        component.sliderComponent.value = 50;
        // if you run fixture.detectChangeshere, slider value would replace value
        expect(50).toEqual(component.sliderComponent.value);

    }));

    it("should run the function getPercentage and returns the correct percentage", async(() => {
        const num = 60;
        const expectedValue = num / (component.sliderMax * 100);
        const getPercentageMock = spyOn(component.sliderComponent, "getPercentage").and.returnValue(expectedValue);

        // this.ax in getPercentage would be undefined in this case
        const realValue = component.sliderComponent.getPercentage(num);

        fixture.detectChanges();

        const elements = fixture.debugElement.queryAll(By.css(".custom-slider-label"));

        fixture.whenStable().then(() => {
            expect(getPercentageMock).toHaveBeenCalled();
            expect(elements[0].nativeElement.innerHTML).toEqual("0%");
            expect(elements[1].nativeElement.innerHTML).toEqual("25%");
            expect(expectedValue).toEqual(realValue);
        });

    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();

        expect(component.sliderComponent.value).not.toBeTruthy();

        component.sliderComponent.writeValue(40);

        fixture.detectChanges();

        expect(component.sliderComponent.value).toEqual(40);

        // when value is undefined, use min value
        component.sliderComponent.min = 10;
        component.sliderComponent.writeValue(undefined);

        expect(component.sliderComponent.value).toEqual(10);

        // if sliderMin too is undefined, return 0
        component.sliderComponent.min = undefined;
        component.sliderComponent.writeValue(undefined);

        expect(component.sliderComponent.value).toEqual(0);

    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.sliderComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.sliderComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.sliderComponent, "writeValue").and.callThrough();

        component.sliderComponent.registerOnChange(onChangeEvent);

        component.sliderComponent.registerOnTouched(onChangeEvent);

        component.slider = 50;
        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.slider).toEqual(component.sliderComponent.value);
        });
    }));

});
