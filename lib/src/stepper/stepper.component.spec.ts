import { StepperComponent } from "./stepper.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";

@Component({
    selector: "test-seb-stepper",
    template: `<seb-stepper
        [(ngModel)]="stepperValue"
        className="{{ className }}"
        [step]="step"
        [min]="min"
        [max]="max"
        id="{{ id }}"
    ></seb-stepper>`,
})
class CustomTestClass {
    @ViewChild(StepperComponent) stepperComponent: StepperComponent;
    className: string;
    stepperValue: number;
    min: number;
    max: number;
    step: number;
    id: string;

    constructor() {
        this.className = "my-stepper";
        this.min = 1;
        this.step = 1;
        this.max = 10;
        this.stepperValue = 1;
        this.id = "myStepper";
    }
}

describe("Component: StepperComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [CustomTestClass, StepperComponent],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(CustomTestClass);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });
    }));

    it("should render and be defined", () => {
        expect(component).toBeTruthy();
    });

    it("the decrement button should be disabled when value is minimum", () => {
        expect(fixture.debugElement.query(By.css(".stepper-decrement > button:disabled"))).toBeTruthy();
        component.min = -10;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".stepper-decrement > button:disabled"))).toBeFalsy();
    });

    it("should render and call the increment function on increment button clicked", () => {
        component.max = 5;
        fixture.detectChanges();

        const onIncrementMock: jasmine.Spy = spyOn(component.stepperComponent, "increment");
        const incrementButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(".stepper-increment>button");
        const event: Event = new Event("click");
        incrementButton.dispatchEvent(event);
        expect(onIncrementMock).toHaveBeenCalled();
        fixture.detectChanges();
    });

    it("should render and call the decrement function on decrement button clicked", () => {
        component.max = 5;
        component.stepperValue = 3;
        fixture.detectChanges();

        const onDecrementMock: jasmine.Spy = spyOn(component.stepperComponent, "decrement");
        const decrementButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(".stepper-decrement>button");
        const event: Event = new Event("click");
        decrementButton.dispatchEvent(event);
        expect(onDecrementMock).toHaveBeenCalled();
    });

    it("should be able to write and update value using the writevalue method", () => {
        expect(component.stepperComponent.value).toBe(1);

        component.stepperComponent.writeValue(3);

        fixture.detectChanges();

        expect(component.stepperComponent.value).toEqual(3);
    });

    it("should call touch and change events when a valid value is set", fakeAsync(() => {
        const onChangeEvent: Function = (change: any) => true;
        const registerOnChangeMock: jasmine.Spy = spyOn(component.stepperComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock: jasmine.Spy = spyOn(component.stepperComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue: jasmine.Spy = spyOn(component.stepperComponent, "writeValue").and.callThrough();

        component.stepperComponent.registerOnChange(onChangeEvent);

        component.stepperComponent.registerOnTouched(onChangeEvent);

        component.stepperValue = 5;

        fixture.detectChanges();
        tick();
        expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
        expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
        expect(onMockWriteValue).toHaveBeenCalled();
        expect(component.stepperValue).toEqual(component.stepperComponent.value);
    }));

    it("getter and setter values of stepperComponent should get be able to get and set a valid value correctly", () => {
        component.stepperComponent.value = 5;
        expect(component.stepperComponent.value).toEqual(5);

        component.stepperComponent.value = 999; // invalid because it's over the max value
        expect(component.stepperComponent.value).toEqual(5);
    });

    it("increment function should increment the value", () => {
        /**
         * When value is less than max and value plus step is lessthan max
         */
        component.stepperComponent.step = 1;
        component.stepperComponent.increment();
        fixture.detectChanges();
        expect(component.stepperComponent.value).toEqual(component.stepperValue);
        expect(component.stepperValue).toEqual(2);
    });

    it("decrement function should decrement the value", () => {
        /**
         * When value is greater than min and value minus step is greater than min
         */
        component.stepperComponent.value = 3;
        component.stepperComponent.decrement();
        fixture.detectChanges();
        expect(component.stepperComponent.value).toEqual(component.stepperValue);
        expect(component.stepperValue).toEqual(2);
    });

    it("should indicate error when user input is not valid", () => {
        component.stepperComponent.value = 3;
        const inputElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input.form-control.stepper-input");
        const event: Event = new Event("input");
        inputElement.value = "abc"; // try typing invalid things
        inputElement.dispatchEvent(event);

        fixture.detectChanges();
        expect(component.stepperComponent.value).toEqual(component.stepperValue);
        expect(fixture.debugElement.queryAll(By.css(`.is-invalid`)).length).toBe(1);
        expect(component.stepperValue).toEqual(3);

        inputElement.value = "4"; //  try to input a valid number within range
        inputElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(`.is-invalid`)).length).toBe(0);
        expect(component.stepperValue).toBe(4);
    });
});
