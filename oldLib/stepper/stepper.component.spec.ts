
import { StepperComponent } from "./stepper.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";

@Component({
    selector: "tac-radioBtnGroup",
    template: ` <ac-stepper [(ngModel)]="stepperValue" className={{className}} [step]="step" [min]="min" [max]="max" name="{{name}}"></ac-stepper>`,
})
class CustomTestClass {
    @ViewChild(StepperComponent) stepperComponent: StepperComponent;
    className: string;
    stepperValue: number;
    min: number;
    max: number;
    step: number;
    name: string;

    constructor() {
        this.className = "my-stepper";
        this.min = 1;
        this.max = 10;
        this.stepperValue = 1;
        this.name = "myStepper";
    }
}

describe("Component: StepperComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [CustomTestClass, StepperComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CustomTestClass);
            component = fixture.componentInstance;
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("the decrement button should be disabled when value is minimum", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.stepperValue = 1;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".stepper-decrement.disabled"))).toBeTruthy();
        });
    }));

    it("should render and call the increment function on increment button clicked", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.min = 1;
            component.max = 5;
            component.step = 1;
            component.stepperValue = 1;
            fixture.detectChanges();

            const onIncrementMock = spyOn(component.stepperComponent, "increment");
            const incrementButton = fixture.debugElement.nativeElement.querySelector(".stepper-increment");
            const event = new Event("click");
            incrementButton.dispatchEvent(event);
            expect(onIncrementMock).toHaveBeenCalled();
            fixture.detectChanges();
        });
    }));

    it("should render and call the decrement function on decrement button clicked", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.min = 1;
            component.max = 5;
            component.step = 1;
            component.stepperValue = 3;
            fixture.detectChanges();

            const onDecrementMock = spyOn(component.stepperComponent, "decrement");
            const decrementButton = fixture.debugElement.nativeElement.querySelector(".stepper-decrement");
            const event = new Event("click");
            decrementButton.dispatchEvent(event);
            expect(onDecrementMock).toHaveBeenCalled();
        });
    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();

        expect(component.stepperComponent.value).toBeNull();

        component.stepperComponent.writeValue(1);

        fixture.detectChanges();

        expect(component.stepperComponent.value).toEqual(1);
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.stepperComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.stepperComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.stepperComponent, "writeValue").and.callThrough();

        component.stepperComponent.registerOnChange(onChangeEvent);

        component.stepperComponent.registerOnTouched(onChangeEvent);

        component.stepperValue = 0;

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.stepperValue).toEqual(component.stepperComponent.value);
        });
    }));

    it("getter and setter values of stepperComponent should get be able to get and set value correctly", () => {
        fixture.detectChanges();
        let expectedValue;
        component.stepperComponent.value = expectedValue = 1;

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.stepperComponent.value);
    });

    it("increment function should increment the value", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            /**
             * When value is less than max and value plus step is lessthan max
             */
            component.stepperComponent.step = 1;
            component.stepperComponent.increment();
            fixture.detectChanges();
            expect(component.stepperComponent.value).toEqual(component.stepperValue);
            expect(component.stepperValue).toEqual(2);
        });
    }));

    it("decrement function should decrement the value", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            /**
             * When value is greater than min and value minus step is greater than min
             */
            component.stepperComponent.value = 3;
            component.stepperComponent.min = 1;
            component.stepperComponent.step = 1;
            component.stepperComponent.decrement();
            fixture.detectChanges();
            expect(component.stepperComponent.value).toEqual(component.stepperValue);
            expect(component.stepperValue).toEqual(2);
        });
    }));

});
