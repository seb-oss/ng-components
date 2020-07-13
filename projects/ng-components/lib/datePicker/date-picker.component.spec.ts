import { DatePickerComponent } from "./date-picker.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";

@Component({
    selector: "tac-datePicker",
    template: ` <sebng-date-picker
        [id]="id"
        [placeholder]="placeholder"
        [min]="startDate"
        [max]="endDate"
        [className]="className"
        [(ngModel)]="dateValue"
    >
    </sebng-date-picker>`,
})
class CustomTestClass {
    @ViewChild(DatePickerComponent) datePickerComponent: DatePickerComponent;
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
        this.endDate = new Date(today.getFullYear(), 11, today.getDate());

        this.id = "my-datepicker";
        this.className = "my-class";
        this.placeholder = "my-placeholder";
    }
}

describe("Component: DatePickerComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [DatePickerComponent, CustomTestClass],
            providers: [],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(CustomTestClass);
                component = fixture.componentInstance;
            });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should render and receive the correct class parameter", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-class"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();

        expect(isNaN(component.datePickerComponent.value.getTime())).toBeTrue(); // Is invalid date

        const expectedObj: Date = new Date();
        component.datePickerComponent.writeValue(expectedObj);

        fixture.detectChanges();

        expect(component.datePickerComponent.value.getTime()).toBe(expectedObj.getTime());
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.datePickerComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.datePickerComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.datePickerComponent, "writeValue").and.callThrough();

        component.datePickerComponent.registerOnChange(onChangeEvent);

        component.datePickerComponent.registerOnTouched(onChangeEvent);

        component.dateValue = new Date();

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.dateValue).toEqual(component.datePickerComponent.value);
        });
    }));

    it("getter and setter values of datePicker should get be able to get and set value correctly", done => {
        fixture.detectChanges();

        let expectedValue: Date;
        component.datePickerComponent.value = expectedValue = new Date();

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.datePickerComponent.value);
        done();
    });
});
