import { DatepickerComponent } from "./datepicker.component";
import { TestBed, ComponentFixture, fakeAsync, tick, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";

@Component({
    selector: "tac-datepicker",
    template: ` <sebng-datepicker
        [id]="id"
        [placeholder]="placeholder"
        [min]="startDate"
        [max]="endDate"
        [className]="className"
        [(ngModel)]="dateValue"
    >
    </sebng-datepicker>`,
})
class CustomTestClass {
    @ViewChild(DatepickerComponent) datepickerComponent: DatepickerComponent;
    dateValue: Date;
    startDate: Date;
    endDate: Date;
    id: string;
    placeholder: string;
    className: string;

    constructor() {
        const today: Date = new Date();
        this.dateValue = today;
        this.startDate = new Date(today.getFullYear(), 0, today.getDate());
        this.endDate = new Date(today.getFullYear(), 12, today.getDate());

        this.id = "my-datepicker";
        this.className = "my-class";
        this.placeholder = "my-placeholder";
    }
}

describe("Component: DatepickerComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, CommonModule],
                declarations: [DatepickerComponent, CustomTestClass],
                providers: [],
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(CustomTestClass);
                    component = fixture.componentInstance;
                });
        })
    );

    it(
        "should render and be defined",
        waitForAsync(() => {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        })
    );

    it(
        "should render and receive the correct class parameter",
        waitForAsync(() => {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".my-class"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
        })
    );

    it(
        "should be able to write and update value using the writevalue method",
        waitForAsync(() => {
            fixture.detectChanges();

            expect(isNaN(component.datepickerComponent.value.getTime())).toBeTrue(); // Is invalid date

            const expectedObj: Date = new Date();
            component.datepickerComponent.writeValue(expectedObj);

            fixture.detectChanges();

            expect(component.datepickerComponent.value.getTime()).toBe(expectedObj.getTime());
        })
    );

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.datepickerComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.datepickerComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.datepickerComponent, "writeValue").and.callThrough();

        component.datepickerComponent.registerOnChange(onChangeEvent);

        component.datepickerComponent.registerOnTouched(onChangeEvent);

        component.dateValue = new Date();

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.dateValue).toEqual(component.datepickerComponent.value);
        });
    }));

    it("getter and setter values of datepicker should get be able to get and set value correctly", done => {
        fixture.detectChanges();

        let expectedValue: Date;
        component.datepickerComponent.value = expectedValue = new Date();

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.datepickerComponent.value);
        done();
    });
});
