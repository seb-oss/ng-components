import { TimepickerComponent, TimepickerValue } from "./timepicker.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { SafeHtmlPipe } from "./timepicker.pipe";

@Component({
    selector: "tac-timepicker",
    template: `   <ac-timepicker name={{name}} className={{className}} [(ngModel)]="timepickerValue"></ac-timepicker>`,
})
class CustomTestClass {
    @ViewChild(TimepickerComponent) timepickerComponent: TimepickerComponent;
    className: string;
    timepickerValue: TimepickerValue;
    name: string;

    constructor() {
        this.className = "my-timepicker";
        this.timepickerValue = {
            hours: 10,
            minutes: 0,
            dayperiod: "AM"
        };
        this.name = "timepicker";
    }
}

describe("Component: TimepickerComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [TimepickerComponent, CustomTestClass, SafeHtmlPipe],
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

    it("should display the correct css className", async(() => {
        component.className = "my-timepicker";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".my-timepicker"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrong-class"))).toBeFalsy();
    }));

    it("should call click and change events on hours, minutes and dayperiod Buttons clicked", async(() => {
        fixture.detectChanges();

        // check for dayperiod, hours, and minutes boxes existence
        expect(fixture.debugElement.query(By.css(".timepicker-hours > .triangle-before"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(".timepicker-minutes > .triangle-before"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(".timepicker-dayperiod > .triangle-before"))).not.toBeNull();

        const clickMockEvent = spyOn(component.timepickerComponent, "handleClick");
        const changeMockEvent = spyOn(component.timepickerComponent, "handleChange");

        const minutesBtn = fixture.debugElement.query(By.css(".timepicker-minutes > .triangle-before"));
        const hoursBtn = fixture.debugElement.query(By.css(".timepicker-hours > .triangle-before"));
        const dayperiodBtn = fixture.debugElement.query(By.css(".timepicker-dayperiod > .triangle-before"));

        const minutesInput = fixture.debugElement.query(By.css(".timepicker-minutes > .timepicker-input"));
        const hoursInput = fixture.debugElement.query(By.css(".timepicker-hours > .timepicker-input"));

        minutesBtn.triggerEventHandler("click", null);
        hoursBtn.triggerEventHandler("click", null);
        dayperiodBtn.triggerEventHandler("click", null);

        hoursInput.triggerEventHandler("keyup", { target: { value: "10" } });
        minutesInput.triggerEventHandler("keyup", { target: { value: "11" } });

        fixture.whenStable().then(() => {
            expect(clickMockEvent).toHaveBeenCalledTimes(3);
            expect(changeMockEvent).toHaveBeenCalledTimes(2);
        });
    }));

    it("handleClick method should return the correct time value", (() => {
        // test for hours increment, Hours greathan equals 12
        let result = component.timepickerComponent.handleClick("HOURS", "INCREMENT", { hours: 13, minutes: 59, dayperiod: "PM" });
        expect(result.hours).toEqual(1);

        // test for hours increment, Hours less 12, hours should equal hour + 1
        result = component.timepickerComponent.handleClick("HOURS", "INCREMENT", { hours: 10, minutes: 59, dayperiod: "PM" });
        expect(result.hours).toEqual(11);

        // test for hours decrement, When Hours is less than equal 1
        result = component.timepickerComponent.handleClick("HOURS", "DECREMENT", { hours: 1, minutes: 59, dayperiod: "PM" });
        expect(result.hours).toEqual(12);

        // test for hours decrement, When Hours is greater than 1
        result = component.timepickerComponent.handleClick("HOURS", "DECREMENT", { hours: 10, minutes: 59, dayperiod: "PM" });
        expect(result.hours).toEqual(9);

        // test for minutes increment,  when minutes is greater than equals 59, minutes hsould be 0
        result = component.timepickerComponent.handleClick("MINUTES", "INCREMENT", { hours: 13, minutes: 60, dayperiod: "PM" });
        expect(result.minutes).toEqual(0);

        // test for minutes increment,  else minute should increment
        result = component.timepickerComponent.handleClick("MINUTES", "INCREMENT", { hours: 13, minutes: 57, dayperiod: "PM" });
        expect(result.minutes).toEqual(58);

        // test for minutes decrement, when value is less than Equal 0, minutes hsould be 59
        result = component.timepickerComponent.handleClick("MINUTES", "DECREMENT", { hours: 13, minutes: 0, dayperiod: "PM" });
        expect(result.minutes).toEqual(59);

        // test for minutes decrement, else minute should decrement
        result = component.timepickerComponent.handleClick("MINUTES", "DECREMENT", { hours: 13, minutes: 35, dayperiod: "PM" });
        expect(result.minutes).toEqual(34);

        // test for dayperiod increment and decerment. When value is AM, dayperiod should be PM and vice versa
        result = component.timepickerComponent.handleClick("DAYPERIOD", "INCREMENT", { hours: 13, minutes: 60, dayperiod: "AM" });
        expect(result.dayperiod).toEqual("PM");

        result = component.timepickerComponent.handleClick("DAYPERIOD", "INCREMENT", { hours: 13, minutes: 60, dayperiod: "PM" });
        expect(result.dayperiod).toEqual("AM");
    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();

        expect(component.timepickerComponent.value.hours).toBeFalsy();
        expect(component.timepickerComponent.value.minutes).toBeFalsy();

        component.timepickerComponent.writeValue({
            hours: 8,
            minutes: 10,
            dayperiod: "AM"
        });

        fixture.detectChanges();

        expect(component.timepickerComponent.value.hours).toEqual(8);
        expect(component.timepickerComponent.value.minutes).toEqual(10);
        expect(component.timepickerComponent.value.dayperiod).toEqual("AM");
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.timepickerComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.timepickerComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.timepickerComponent, "writeValue").and.callThrough();

        component.timepickerComponent.registerOnChange(onChangeEvent);

        component.timepickerComponent.registerOnTouched(onChangeEvent);

        component.timepickerValue = {
            hours: 9,
            minutes: 10,
            dayperiod: "AM"
        };

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.timepickerValue).toEqual(component.timepickerComponent.value);
        });
    }));

    it("getter and setter values of timePicker should get be able to get and set value correctly", (done) => {
        fixture.detectChanges();
        let expectedValue;
        component.timepickerComponent.value = expectedValue = {
            hours: 11,
            minutes: 10,
            dayperiod: "AM"
        };

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.timepickerComponent.value);
        done();
    });

    it("handleChange function should be able to handle the time change and returns a correct time", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            /**
             * Hours context
             */

            // when value is greater than 13 , hours should be 12;
            component.timepickerComponent.handleChange("HOURS", 13);

            expect(component.timepickerComponent.value.hours).toEqual(12);

            // when hours is less than 1, hours should be 1
            component.timepickerComponent.handleChange("HOURS", 0);

            expect(component.timepickerComponent.value.hours).toEqual(1);

            // Hours should be the value otherwise
            component.timepickerComponent.handleChange("HOURS", 2);

            expect(component.timepickerComponent.value.hours).toEqual(2);

            /**
             * MINUTES context
             */

            // When value is greater than 59
            component.timepickerComponent.handleChange("MINUTES", 60);

            expect(component.timepickerComponent.value.minutes).toEqual(59);

            // when number is less than 0, minutes should 0
            component.timepickerComponent.handleChange("MINUTES", -1);

            expect(component.timepickerComponent.value.minutes).toEqual(0);

            // Otherwise, minutes should be value

            component.timepickerComponent.handleChange("MINUTES", 12);

            expect(component.timepickerComponent.value.minutes).toEqual(12);

        });
    }));

});
